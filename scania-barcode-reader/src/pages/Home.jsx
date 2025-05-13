import BarcodeScanner from "../components/BarcodeScanner/BarcodeScanner";
import Input from "../components/Input/Input";
import { useState } from "react";

export default function Home() {
    const [barcode, setBarcode] = useState("");
    return (
        <>
            <BarcodeScanner onScan={(code) => setBarcode(code)} />
            <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        </>
    );
}