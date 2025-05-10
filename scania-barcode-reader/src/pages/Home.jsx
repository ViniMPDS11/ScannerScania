import BarcodeScanner from "../components/BarcodeScanner/BarcodeScanner";

export default function Home() {
    return (
        <>
            <p>Home</p>
            <BarcodeScanner onScan={(code) => console.log('Código lido:', code)} />
        </>
    );
}