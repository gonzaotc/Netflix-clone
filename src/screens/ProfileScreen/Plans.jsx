import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectRole, selectUser, userActions } from "../../features/user/userSlice";
import db, { productsCollection } from "../../firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Plans = () => {
  const [arePlansLoading, setArePlansLoading] = useState(true);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const buttonRef = useRef(null);
  // const [subscription, setSubscription] = useState(null);
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   getDocs(collection(db, `customers/${user.uid}/subscriptions`)).then(querySnapshot => {
  //     querySnapshot.forEach(async subscription => {
  //       setSubscription({
  //         role: subscription.data().role,
  //         current_period_end: subscription.data().current_period_end.seconds,
  //         current_period_start: subscription.data().current_period_start.seconds,
  //       });
  //     });
  //   });
  // }, []);

  useEffect(() => {
    getDocs(productsCollection).then(querySnapshot => {
      const products = {};
      querySnapshot.forEach(async productDoc => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(db, "products", productDoc.id, "prices"));
        priceSnap.docs.forEach(price => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
      setTimeout(() => {
        setArePlansLoading(false);
      }, 1);
      //
    });
  }, []);

  const handleLoadCheckout = async (planId, priceId) => {
    setIsStripeLoading(planId);
    const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    // FIREBASE V8:
    // const docRef = await db
    //   .collection("customers")
    //   .doc(user.uid)
    //   .collection("checkout_sessions")
    //   .add({
    //     price: priceId,
    //     success_url: window.location.origin,
    //     cancel_url: window.location.origin,
    //   });

    onSnapshot(docRef, async snap => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        // setIsLoading(false);
      }
      if (sessionId) {
        // We have a Stripe Checkout URL, let's redirect.
        // window.location.assign(url);
        const stripe = await loadStripe(
          "pk_test_51KUxrdJfi0vSrKNfqDOsQg0IGkPYRZfmwXl64kTLeaEPHJsyY2aj2mfPAC5SV1LUBjZdG0OSgqKW4D9dqDGRpiNY00uC9SuUzF"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <>
      <div className="profile__info__plans">
        <h3 className="profile__info__plans__title">Planes</h3>
        {user.current_perior_end && (
          <h3 className="profile__info__plans__actualPlan">(Plan actual: {user.role})</h3>
        )}
      </div>
      {user.current_perior_end && (
        <p className="profile__info__renewal">
          Renewal date: {new Date(user.current_period_end * 1000).toLocaleDateString()}
        </p>
      )}
      {!arePlansLoading &&
        Object.entries(products).map(([planId, planData]) => {
          const isCurrentPackage = planData.name?.toLowerCase().includes(user.role);
          return (
            <span className="profile__info__plan" key={planId}>
              <span>
                <span>{planData.name}</span> <span>{planData.description}</span>
              </span>
              {!(isStripeLoading === planId) && (
                <button
                  className={isCurrentPackage ? "buttonActual" : "button"}
                  onClick={() =>
                    !isCurrentPackage && handleLoadCheckout(planId, planData?.prices?.priceId)
                  }
                >
                  {!isCurrentPackage ? "Suscribir" : "Plan actual"}
                </button>
              )}
              {isStripeLoading === planId && (
                <button className="loadingButton">
                  <FontAwesomeIcon className="loadingIcon" icon={faSpinner} pulse />
                </button>
              )}
            </span>
          );
        })}
      {arePlansLoading && (
        <div className="loadingPlans">
          <FontAwesomeIcon className="loadingIcon" icon={faSpinner} pulse />
        </div>
      )}
    </>
  );
};

export default Plans;
