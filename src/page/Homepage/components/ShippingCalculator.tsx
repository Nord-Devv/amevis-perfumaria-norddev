import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Truck,
} from "lucide-react";
import { useState } from "react";


export const ShippingCalculator = () => {
  const [calculating, setCalculating] = useState(false);
  const [cep, setCep] = useState("");

  const [shippingInfo, setShippingInfo] = useState<{
    price: string;
    days: string;
  } | null>(null);


  const calculateShipping = () => {
    if (cep.length === 8) {
      setCalculating(true);
      // Simulação de cálculo de frete
      setTimeout(() => {
        setShippingInfo({
          price: "R$ 15,00",
          days: "5-7 dias úteis",
        });
        setCalculating(false);
      }, 800);
    }
  };
  const handleCepChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);
    if (shippingInfo) setShippingInfo(null);
  };



  return (
    <div className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-none p-5 border border-[#C9A14A]/30">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-[#C9A14A]" />
        <h4 className="text-white uppercase tracking-wider text-sm">
          Calcular Frete
        </h4>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={8}
          className="flex-1 bg-[#0F0F0F] border-[#C9A14A]/40 focus-visible:ring-[#C9A14A] text-white placeholder:text-gray-500 rounded-none"
        />
        <Button
          onClick={calculateShipping}
          disabled={cep.length !== 8 || calculating}
          className="bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] text-black rounded-none uppercase tracking-wider"
          size="sm"
        >
          {calculating ? "..." : "OK"}
        </Button>
      </div>
      {shippingInfo && (
        <div className="mt-4 pt-4 border-t border-[#C9A14A]/20">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Frete:</span>
            <span className="text-[#C9A14A]">
              {shippingInfo.price}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Prazo:</span>
            <span className="text-gray-300">
              {shippingInfo.days}
            </span>
          </div>
        </div>
      )}
    </div>

  )
}
