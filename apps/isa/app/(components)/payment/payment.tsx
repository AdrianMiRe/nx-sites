"use client";

import { FC, useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    OpenPay: {
      setId: (id: string) => void;
      setApiKey: (key: string) => void;
      setSandboxMode: (sandbox: boolean) => void;
      deviceData: {
        setup: (formId: string, hiddenFieldName: string) => string;
      };
    };
  }
}

const PaymentComponent: FC = () => {
  const [isLoaded, setIsLoaded] = useState<{ min: boolean; data: boolean }>({
    min: false,
    data: false,
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize OpenPay when "min.js" is loaded
  useEffect(() => {
    if (isLoaded.min && window.OpenPay) {
      const sandboxMode =
        process.env.NEXT_PUBLIC_SANDBOX_LAFAM === "true" ? true : false;

      window.OpenPay.setId(process.env.NEXT_PUBLIC_MERCHANTID_LAFAM || "");
      window.OpenPay.setApiKey(process.env.NEXT_PUBLIC_PK_LAFAM || "");
      window.OpenPay.setSandboxMode(sandboxMode);
    }
  }, [isLoaded.min]);

  // Set up device session ID when "openpay-data.js" is loaded
  useEffect(() => {
    if (isLoaded.data && window.OpenPay) {
      try {
        const deviceSessionId = window.OpenPay.deviceData.setup(
          "payment-form",
          "deviceIdHiddenFieldName"
        );
        setSessionId(deviceSessionId);
      } catch (error) {
        console.error("Error generating deviceSessionId:", error);
      }
    }
  }, [isLoaded.data]);

  return (
    <>
      {/* Script for OpenPay main library */}
      <Script
        src="https://resources.openpay.co/openpay.v1.min.js"
        strategy="beforeInteractive"
        onLoad={() => setIsLoaded((prev) => ({ ...prev, min: true }))}
      />
      {/* Script for OpenPay device data */}
      <Script
        src="https://resources.openpay.co/openpay-data.v1.min.js"
        strategy="beforeInteractive"
        onLoad={() => setIsLoaded((prev) => ({ ...prev, data: true }))}
      />

      {/* Payment form */}
      <form id="payment-form">
        <input
          type="hidden"
          name="deviceIdHiddenFieldName"
          id="deviceIdHiddenFieldName"
        />
        {/* Add other payment fields here */}
      </form>

      {/* Display the sessionId if available */}
      {sessionId && <p>Session ID: {sessionId}</p>}
    </>
  );
};

export default PaymentComponent;
