import BarcodeScanner from "../components/BarcodeScanner/BarcodeScanner";

export default function Home() {
    return (
        <BarcodeScanner onScan={(code) => console.log('Código lido:', code)} />
    );
}