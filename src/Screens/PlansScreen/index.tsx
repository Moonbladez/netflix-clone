import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { db } from "./../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { selectUser } from "./../../features/user/userSlice";
import { setSubscription } from "./../../features/subscription/subscriptionSlice";

import styles from "./PlanScreen.module.scss";

interface PlansResponse {
  active: boolean;
  description: string;
  images: [];
  metaData: {};
  name: string;
  prices: PlansPrices;
}

interface PlansPrices {
  priceData: {};
  priceId: string;
}

export interface SubscriptionDetails {
  role: string;
  current_period_end: number;
  current_period_start: string;
}

export const PlansScreen = () => {
  const [products, setProducts] = useState<PlansResponse>();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleCheckout = async (priceId: number) => {
    const docRef = await db.collection("customers").doc(user?.uid).collection("checkout_sessions").add({
      price: priceId,
      success_url: window.location.href,
      cancel_url: window.location.href,
    });

    docRef.onSnapshot(async (snap) => {
      if (snap.data()?.error) {
        alert(`An error occured: ${snap.data()?.error.message}`);
      }

      if (snap.data()?.sessionId) {
        const stripe = await loadStripe(
          "pk_test_51JCsGgKILxFwi2RxpEcVFdBYbtgLMT85TnzdOwTaqlQtoMRVZAIUoio148VqxKWJ3BohQnxl5UMFCbMIoExazwau00tmBF2z2O"
        );

        stripe?.redirectToCheckout({ sessionId: snap.data()?.sessionId });
      }
    });
  };
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products: any = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      });
  }, []);

  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          });
        });
      });
    // .then(() => {
    //   dispatch({
    //     role: subscription?.role,
    //     current_period_end: subscription?.current_period_end,
    //     current_period_start: subscription?.current_period_start,
    //   });
    // });
  }, [user?.uid, dispatch, subscription]);

  return (
    <div className={styles.planScreen}>
      {subscription && <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {products &&
        Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name.toLowerCase().includes(subscription?.role);

          return (
            <div key={productId} className={styles.planDetails}>
              <div>
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>

              <button
                className={styles.planSubscribeButton}
                disabled={isCurrentPackage}
                onClick={() => !isCurrentPackage && handleCheckout(productData.prices.priceId)}
              >
                <span>{isCurrentPackage ? "Current Packge" : "Subscribe"}</span>
              </button>
            </div>
          );
        })}
    </div>
  );
};
