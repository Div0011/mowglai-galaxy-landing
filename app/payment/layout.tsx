import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Secure Payment Terminal | Mowglai",
    description: "Secure payment checkout terminal for Mowglai Digital Agency. Process project deposits, template purchases, or maintenance subscriptions via Razorpay Gateway or UPI QR code.",
    keywords: [
        "Mowglai payment",
        "secure checkout",
        "Razorpay payment Mowglai",
        "UPI payment Mowglai",
        "pay digital agency",
    ],
    alternates: {
        canonical: "https://mowglai.com/payment",
    },
};

export default function PaymentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
