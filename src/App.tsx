import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/Header";
import { ProductCard } from "./components/ProductCard";
import { ProductDialog } from "./components/ProductDialog";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { Button } from "./components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Instagram,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { type CartItem } from "./components/CartDrawer";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import logoAmevi from "./assets/e214b3767302229bb769b749498b0cffbf615395.png";
import {
  ProductStore,
  type Product,
  type ProductInput,
  initializeDefaultProducts,
} from "./admin/productStore";
import { AdminPage } from "./admin/AdminPage";

// Initial products (will be auto-assigned IDs)
const initialProductsData: ProductInput[] = [
  // --- CAROLINA HERRERA ---
  {
    name: "Sauvage",
    brand: "Christian Dior",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1ALFjZoWDHAS5CQtyi8eYY0O52BZ3ePmO&sz=w1000",
    description:
      "Um fougère aromático moderno com notas poderosas de bergamota e ambroxan, com um toque picante.",
    notes: {
      top: [],
      heart: [],
      base: ["Aromático", "Fougère", "Especiado"],
    },
  },
  {
    name: "Yara",
    brand: "Lattafa",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1K_e9j30PIQ2gTPrvoWlRQN0BDpTp2o_S&sz=w1000",
    description:
      "Um best-seller árabe, um oriental baunilha com notas de orquídea, frutas tropicais e baunilha cremosa.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Baunilha", "Frutado"],
    },
  },
  {
    name: "J'adore",
    brand: "Christian Dior",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1zqutcdLT9Bjw6rpXK0_BzqzgLiIOifzH&sz=w1000",
    description:
      "Um buquê floral radiante e clássico, com Ylang-Ylang, Jasmim e Rosa. A essência da feminilidade absoluta.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Branco"],
    },
  },
  {
    name: "1 Million",
    brand: "Paco Rabanne",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1kAaTXt352GHjUiDfIJkrsqlWrXFX-Kzg&sz=w1000",
    description:
      "Um clássico ousado com notas de couro e canela, representando poder e riqueza.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Especiado", "Couro"],
    },
  },
  {
    name: "Good Girl",
    brand: "Carolina Herrera",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=17jwprjPsy72HRO5LpSkL7-FvsPXmfyK1&sz=w1000",
    description:
      "A icônica fragrância que representa a dualidade da mulher moderna, com notas doces de baunilha e amêndoa.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Floral", "Gourmand"],
    },
  },
  {
    name: "Scandal",
    brand: "Jean Paul Gaultier",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1S7fCot23cLDAwn6L1ZSO4KVf6tIoAjq5&sz=w1000",
    description:
      "Um chipre gourmand luxuoso, famoso pela combinação de mel e patchouli. Um aroma elegante e atrevido.",
    notes: {
      top: [],
      heart: [],
      base: ["Chipre", "Floral", "Gourmand"],
    },
  },
  {
    name: "212 VIP Rosé",
    brand: "Carolina Herrera",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1qBirVcMViy-PTiXb5PalzmQGmjI-NT3A&sz=w1000",
    description:
      "Um aroma efervescente e festivo, com a leveza do Champagne Rosé e a sedução do almíscar.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Almiscarado"],
    },
  },
  {
    name: "Invictus",
    brand: "Brand Collection",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1S-fb3ONuiW9Qt4DWLtqhiwsoS3c1Vapd&sz=w1000",
    description:
      "Miniatura inspirada no Invictus, com acordes aquáticos e cítricos.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Aquático", "Cítrico"],
    },
  },
  {
    name: "Toy Boy",
    brand: "Moschino",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Masculino",
    image: "https://drive.google.com/thumbnail?id=1wIO5Ho6JsXcmn4V4LuwBMgVyamqxk3pq&sz=w1000",
    description: "Amadeirado Especiado inusitado. Abre com pera e pimenta rosa, surpreendendo com um coração floral de rosa e magnólia.",
    notes: {
      top: [],
      heart: [],
      "base": ["Amadeirado", "Rosa", "Pera"]
    }
  },

  // --- PACO RABANNE ---
  {
    name: "Lady Million",
    brand: "Paco Rabanne",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1i2YHYdHqbZ1-Azr3PImWnu9YubR5inkl&sz=w1000",
    description:
      "Um perfume opulento e viciante com flores brancas e notas doces de mel e patchouli.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Amadeirado"],
    },
  },
  {
    name: "Fame",
    brand: "Brand Collection",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1MmHEF6VPAKr9KDgllqKJY7rt3AEcn2f8&sz=w1000",
    description:
      "Uma fragrância Chipre Floral Frutada que exala luxo e ousadia, combinando manga suculenta com um buquê de jasmim cremoso e incenso.",
    notes: {
      top: [],
      heart: [],
      base: ["Chipre", "Floral", "Manga"],
    },
  },

  {
    name: "Olympea",
    brand: "Paco Rabanne",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1XWRpE5G_-c6CxPDPlq-Bz7s8x1iMhPdR&sz=w1000",
    description:
      "Um oriental fresco com um acorde de baunilha salgada viciante, representando a deusa moderna.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Floral", "Salgado"],
    },
  },
  {
    name: "Phantom",
    brand: "Paco Rabanne",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1NXZBCjPcaUjw8YQfPXJ4LU4cy-vpyluq&sz=w1000",
    description:
      "A primeira fragrância conectada, com lavanda cremosa e limão que energiza a mente.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Aromático", "Baunilha"],
    },
  },
  // --- JEAN PAUL GAULTIER ---
  {
    name: "Scandal",
    brand: "Jean Paul Gaultier",
    price: "R$ 30,00",
    category: "Perfumaria",
    productType: "Body Splash",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1ecIskeYTlvUpaZL6dJMchm2B_sgOpRUY&sz=w1000",
    description:
      "Versão Body Splash da icônica fragrância, ideal para prolongar a sensação de banho.",
    notes: {
      top: [],
      heart: [],
      base: ["Chipre", "Floral", "Mel"],
    },
  },
  {
    name: "Skateboard Heroes",
    brand: "Brand Collection",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1EXyFM6BCiSXQdwv75UDtHqIGcif6Yko_&sz=w1000",
    description:
      "Miniatura inspirada no 212 Heroes, um aroma frutado e ousado.",
    notes: {
      top: [],
      heart: [],
      base: ["Cítrico", "Especiado", "Frutado"],
    },
  },
  // --- CHRISTIAN DIOR ---
  {
    name: "Hypnotic Poison",
    brand: "Christian Dior",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1HIMfAzpFUwT40Qm1VL2kEzFORTGHCfGn&sz=w1000",
    description:
      "Um oriental hipnótico com baunilha, amêndoa e coco, com uma vibe doce e misteriosa.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Baunilha", "Amêndoa"],
    },
  },
  // --- LATTAFA (ÁRABES) ---
  {
    name: "Musamam White Intense ",
    brand: "Lattafa",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Unissex",
    image:
      "https://drive.google.com/thumbnail?id=1Q7Fsuim2F39xH_2GXVJUkbQpga6uVCQP&sz=w1000",
    description:
      "Uma fragrância amadeirada cremosa e intensa, com notas cítricas de abertura, suavizadas por âmbar e madeiras de Oud.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Aromático", "Âmbar"],
    },
  },
  {
    name: "Asad Vinho",
    brand: "Lattafa",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1r4ODm7Lo0WuRYqHtHNr2Qv5lRuvTj7Qs&sz=w1000",
    description:
      "Uma fragrância ambarada e intensa com baunilha, tabaco e pimenta preta. Forte projeção e fixação.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Amadeirado", "Especiado"],
    },
  },
  {
    name: "Asad (Preto)",
    brand: "Lattafa",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1aSodfCJOdLTDXJQF_Q8xN84hyLfXDHSs&sz=w1000",
    description:
      "Versão intensa com notas de café, âmbar e baunilha, uma fragrância quente e viciante.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Amadeirado", "Gourmand"],
    },
  },
  {
    name: "Fakhar Lattafa Dourado",
    brand: "Lattafa",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1-Xf34Iu4OyLJOjr2DMvggOS0Y5C3sVNU&sz=w1000",
    description:
      "Uma fragrância floral opulenta e sensual, com tuberosa e notas frutadas.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Floral", "Branco"],
    },
  },
  {
    name: "Fakhar Lattafa Prata",
    brand: "Lattafa",
    price: "R$ 39,90",
    category: "Perfumes",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1IhpmznxIkXeew3s9CxMFYXsQLBkoQckQ&sz=w1000",
    description:
      "Um amadeirado aromático fresco e limpo, com ótima performance para o uso diário.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Aromático", "Marinho"],
    },
  },
  {
    name: "Fakhar Rose",
    brand: "Lattafa",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1Bu6s8l_lBy9dzIaEgPW9D5UDdf8FonC_&sz=w1000",
    description:
      "Um amadeirado aromático fresco e limpo, com ótima performance para o uso diário.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Baunilha"],
    },
  },
  {
    name: "Yara",
    brand: "Lattafa",
    price: "R$ 30,00",
    category: "Perfumaria",
    productType: "Body Splash",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1vTjTRP9tGJoVosR2Li0u7yxn4LVxuOGU&sz=w1000",
    description:
      "Uma fragrância floral exuberante e sedutora, com destaque para um buquê de flores brancas (Tuberosa, Jasmim) e um fundo suave de baunilha.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Baunilha", "Frutado"],
    },
  },
  {
    name: "Sabah Al Ward",
    brand: "Lattafa",
    price: "R$ 30,00",
    category: "Perfumaria",
    productType: "Body Splash",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1MqGEfIp4ygk1obVB19T5rligAanoeyGs&sz=w1000",
    description:
      "Body Splash floral oriental com pimenta rosa e cacau, perfeito para um toque exótico no dia a dia.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Oriental", "Especiado"],
    },
  },
  // --- ORIENTICA ---
  {
    name: "Royal Amber",
    brand: "Orientica",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Unissex",
    image:
      "https://drive.google.com/thumbnail?id=1K6M8lJcEIo55AvrbmpbrwZVmPquDw7qL&sz=w1000",
    description:
      "Um oriental ambarado e quente, com toques de melão e baunilha. Rico e luxuoso.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Baunilha", "Âmbar"],
    },
  },
  {
    name: "212 VIP Men",
    brand: "Carolina Herrera",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1cA_7OjFJJKS524fRZiPRis6qFBVajucg&sz=w1000",
    description:
      "Uma fragrância intensa e moderna, inspirada na vida noturna vibrante e exclusiva.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Amadeirado", "Especiado"],
    },
  },
  {
    name: "212 VIP Black",
    brand: "Carolina Herrera",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=14MXv7eIVCuV-r0NvlQGiKVccARIlgM_f&sz=w1000",
    description:
      "Um perfume explosivo e viciante, com notas de absinto e lavanda que celebram a exclusividade.",
    notes: {
      top: [],
      heart: [],
      base: ["Aromático", "Fougère", "Baunilha"],
    },
  },
  {
    name: "Royal Amber",
    brand: "Orientica",
    price: "R$ 30,00",
    category: "Perfumaria",
    productType: "Body Splash",
    subcategory: "Unissex",
    image:
      "https://drive.google.com/thumbnail?id=1z6k6yO1dF5E3qvHV4ycYR35CUIMjB3N0&sz=w1000",
    description:
      "Versão Body Splash do perfume, ideal para manter a aura ambarada e exótica com leveza.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Âmbar", "Baunilha"],
    },
  },
  // --- OUTRAS MARCAS DE LUXO/DESIGNER ---
  {
    name: "Malbec",
    brand: "O Boticário",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1N_U23iUJsyekV7VgzV0vlCYMg66uFcei&sz=w1000",
    description:
      "O clássico brasileiro, um amadeirado aromático com a exclusividade do álcool vínico envelhecido em barris de carvalho.",
    notes: {
      top: [],
      heart: [],
      base: ["Amadeirado", "Aromático", "Musgo"],
    },
  },
  {
    name: "Angel",
    brand: "Thierry Mugler",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=10egfXmn3Tf4oev_gAFaLDL9-eGYgNNI_&sz=w1000",
    description:
      "O primeiro gourmand, uma fragrância inesquecível com notas de algodão-doce, chocolate e patchouli.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Baunilha", "Gourmand"],
    },
  },
  {
    name: "CK One",
    brand: "Calvin Klein",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Unissex",
    image:
      "https://drive.google.com/thumbnail?id=1AvE9CCorTRFh79zZHhJpvd6icC4o_mQj&sz=w1000",
    description:
      "O aroma cítrico e limpo que marcou uma geração. Perfeito para o frescor do dia a dia.",
    notes: {
      top: [],
      heart: [],
      base: ["Cítrico", "Aromático", "Chá Verde"],
    },
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1hqTufq0a0NkZ09dDoapb6NbxzpJNZ43y&sz=w1000",
    description:
      "Um floral frutado gourmand que celebra a felicidade, com notas de Íris e Pralinê.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Gourmand"],
    },
  },
  {
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1dCOHTydBptqepS8dpalKPA8AvZSBEQld&sz=w1000",
    description:
      "Um clássico fresco e cítrico, que remete aos dias de verão no Mediterrâneo, com limão siciliano e cedro.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Cítrico"],
    },
  },
  {
    name: "Rouge 540",
    brand: "Baccarat / MFK",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Unissex",
    image:
      "https://drive.google.com/thumbnail?id=1n05Q3GH8Wc6L58CqJYlTYLpOR8fRN2z_&sz=w1000",
    description:
      "Um perfume que virou fenômeno. É ambarado, com notas de açafrão, jasmim e um acorde de algodão-doce.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Floral", "Âmbar"],
    },
  },
  {
    name: "Valaya",
    brand: "Parfums de Marly",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1ELaxllLD7Pw0mM_HklXzjpbuQZwA1jGB&sz=w1000",
    description:
      "Uma fragrância luxuosa com uma aura de algodão e pele limpa, destacada por almíscar e aldeídos.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Almiscarado", "Almíscar"],
    },
  },
  {
    name: "Black",
    brand: "Ferrari",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1hBVp6NfL-HEoDWVFUnGIb5A8JFJ82_Gi&sz=w1000",
    description:
      "Um fougère aromático frutado e versátil, com maçã, canela e baunilha.",
    notes: {
      top: [],
      heart: [],
      base: ["Aromático", "Fougère", "Frutado"],
    },
  },
  {
    name: "Silver Scent Intense",
    brand: "Jacques Bogart",
    price: "R$ 75,00",
    category: "Perfumaria",
    productType: "Brand",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1KbBTNtUyugfJ1q0CwYmwuZ_7pV5zVrTo&sz=w1000",
    description:
      "Uma versão mais potente, oriental e doce do clássico, com notas de oud e fava tonka.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Fougère", "Baunilha"],
    },
  },
  {
    name: "Animale For Men",
    brand: "Animale",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=15qVZXAENOjUBmyFUmJ4RlyHcbwV_2q4D&sz=w1000",
    description:
      "Um oriental especiado clássico e complexo, com notas de couro e lavanda.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Especiado", "Couro"],
    },
  },
  // --- BRAND COLLECTION (Contratipos/Miniaturas) ---


  {
    name: "CH Men",
    brand: "Carolina Herrera",
    price: "R$ 39,90",
    category: "Perfumaria",
    productType: "Comum",
    subcategory: "Masculino",
    image:
      "https://drive.google.com/thumbnail?id=1nJYzsedw01j0G-yvfLiy1EncB454rCPw&sz=w1000",
    description:
      "Um aroma elegante e casual que combina couro, açafrão e açúcar, ideal para o dia a dia sofisticado.",
    notes: {
      top: [],
      heart: [],
      base: ["Oriental", "Couro", "Especiado"],
    },
  },
  {
    name: "212 VIP Rosé",
    brand: "Carolina Herrera",
    price: "R$ 30,00",
    category: "Perfumaria",
    productType: "Body Splash",
    subcategory: "Feminino",
    image:
      "https://drive.google.com/thumbnail?id=1FaLPqzCokIe8PGP1XxKep7t2WM-kpT6a&sz=w1000",
    description:
      "Versão leve e refrescante da fragrância VIP Rosé, perfeita para uso diário após o banho.",
    notes: {
      top: [],
      heart: [],
      base: ["Floral", "Frutado", "Champagne Rosé"],
    },
  },
  // --- AUTOCUIDADO ---
  {
    name: "Géis Aromatizantes Secrets Woman (Kit)",
    brand: "Swiss Beauty",
    price: "R$ 25,00",
    category: "Autocuidado",
    subcategory: "Corpo",
    image:
      "https://drive.google.com/thumbnail?id=1f6-e7nAS7MEGij0PLacpLjLYwSu1FTfK&sz=w1000",
    description:
      "Géis íntimos aromatizantes com sabores variados (Uva, Chocolate c/ Morango, Morango c/ Creme), ideais para uso na virilha.",
    notes: {
      top: [],
      heart: [],
      base: ["Uva", "Chocolate", "Morango"],
    },
  },
  // --- MAQUIAGEM - ACESSÓRIOS ---
  {
    name: "Kit Acessórios Skincare",
    brand: "MEILI STAR / Genérico",
    price: "R$ 38,00",
    category: "Autocuidado",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=1rSzj8IszTyPCPKjN1SodHzwfpx0ojclo&sz=w1000", // << Substituir com a imagem do Roller Preto
    description:
      "Conjunto de ferramentas para rotina facial: rolo massageador de Obsidiana (preto) para drenagem, esponja de silicone Polvo para limpeza e esponja gota para maquiagem.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Massagem",
        "Drenagem",
        "Limpeza",
        "Aplicação",
        "Roller Preto (Obsidiana)",
      ],
    },
  },
  {
    name: "Kit Acessórios Skincare",
    brand: "MEILI STAR / Genérico",
    price: "R$ 38,00",
    category: "Autocuidado",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=174XZTZ505F6nBodJ_I0DlLmNaNxoZ48l&sz=w1000",
    description:
      "Conjunto de ferramentas para rotina facial: rolo massageador de Jade (verde) para drenagem, esponja de silicone Polvo para limpeza e esponja gota para maquiagem.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Massagem",
        "Drenagem",
        "Limpeza",
        "Aplicação",
        "Roller Verde (Jade)",
      ],
    },
  },
  {
    name: "Kit Acessórios Skincare",
    brand: "MEILI STAR / Genérico",
    price: "R$ 38,00",
    category: "Autocuidado",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=1HU68igl1rVK383VxgfjLfJ8EjcJ4K_lZ&sz=w1000",
    description:
      "Conjunto de ferramentas para rotina facial: rolo massageador de Quartzo Branco/Rosa (claro) para drenagem, esponja de silicone Polvo para limpeza e esponja gota para maquiagem.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Massagem",
        "Drenagem",
        "Limpeza",
        "Aplicação",
        "Roller Branco (Quartzo)",
      ],
    },
  },
  // --- MAQUIAGEM - ROSTO ---
  {
    name: "Paleta para Sobrancelhas Trio Matte",
    brand: "Swiss Beauty",
    price: "R$ 20,00",
    category: "Maquiagem",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=1Abc-Emk1iEtp_QTdLSlxHRV6lFSErzO5&sz=w1000",
    description:
      "Paleta com três tons de sombra em pó matte (Claro, Médio, Escuro) para preencher, definir e modelar as sobrancelhas de forma natural.",
    notes: {
      top: [],
      heart: [],
      base: ["Pó Compacto", "Matte", "Marrom"],
    },
  },
  {
    name: "Blush Double Love Duo",
    brand: "Pink 21",
    price: "R$ 17,00",
    category: "Maquiagem",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=1_cTxQ3kikMXyeRxKGUBD-nK_O_L8bDGk&sz=w1000",
    description:
      "Duo de blush em formato de coração, com cores pêssego/coral, textura aveludada e acabamento matte, fácil de esfumar.",
    notes: {
      top: [],
      heart: [],
      base: ["Pó", "Matte", "Pêssego"],
    },
  },
  {
    name: "Iluminador Heart Radiance Dopamine",
    brand: "Ruby Rose",
    price: "R$ 17,00",
    category: "Maquiagem",
    subcategory: "Rosto",
    image:
      "https://drive.google.com/thumbnail?id=1YEdeORF7wLeuuyDNzdYnmiD8dHSeDD4k&sz=w1000",
    description:
      "Iluminador em pó compacto com brilho intenso (tonalidade Laranja/Cobre), ideal para destacar as áreas do rosto.",
    notes: {
      top: [],
      heart: [],
      base: ["Pó", "Cintilante", "Cobre"],
    },
  },
  // --- MAQUIAGEM - OLHOS/LÁBIOS/ACESSÓRIOS ---
  {
    name: "Paleta de Sombras Energy Eyeshadows",
    brand: "Luisance",
    price: "R$ 28,00",
    category: "Maquiagem",
    subcategory: "Olhos",
    image:
      "https://drive.google.com/thumbnail?id=1dnNo3oNk_JC91N3pnuxxnj-JQAFOIkz1&sz=w1000",
    description:
      "Paleta versátil com tons neutros e vibrantes (roxo, bronze), oferecendo acabamentos matte e cintilante.",
    notes: {
      top: [],
      heart: [],
      base: ["Matte", "Cintilante", "Roxo"],
    },
  },
  {
    name: "Kit Pincéis Sereia",
    brand: "Genérico",
    price: "R$ 20,00",
    category: "Maquiagem",
    subcategory: "Acessórios",
    image:
      "https://drive.google.com/thumbnail?id=1-DrLumQ3N1xUytZOrl_J076Pj7GE2Zf2&sz=w1000", // Substituir com a imagem do Arco-Íris Completo
    description:
      "Kit multifuncional de pincéis com cabos em design sereia/holográfico, com gradiente completo de cores (Pink, Roxo, Azul, Verde). Essenciais para face e olhos.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Cerdas Sintéticas",
        "Holográfico",
        "Cabo Arco-Íris",
      ],
    },
  },
  {
    name: "Kit Pincéis Sereia",
    brand: "Genérico",
    price: "R$ 20,00",
    category: "Maquiagem",
    subcategory: "Acessórios",
    image:
      "https://drive.google.com/thumbnail?id=1MzNDxwNbID_51paEpfOEesAwfEibS1dP&sz=w1000", // Substituir com a imagem do Turquesa/Roxo
    description:
      "Kit multifuncional de pincéis com cabos em design sereia/holográfico, com dominância de tons turquesa, azul e roxo. Essenciais para face e olhos.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Cerdas Sintéticas",
        "Holográfico",
        "Cabo Turquesa/Roxo",
      ],
    },
  },
  {
    name: "Esponjinhas (Kit)",
    brand: "Bilansy",
    price: "R$ 20,00",
    category: "Maquiagem",
    subcategory: "Acessórios",
    image:
      "https://drive.google.com/thumbnail?id=1qj2jrnlVgbvuII_7wsvV_Nx6YUlX8FHE&sz=w1000",
    description:
      "Kit de esponjas em formato gota e anatômicos para aplicação uniforme de maquiagem líquida ou cremosa.",
    notes: {
      top: [],
      heart: [],
      base: ["Latex-free", "Gota"],
    },
  },
  {
    name: "Candy Lip Gloss",
    brand: "Vivai",
    price: "R$ 10,00",
    category: "Maquiagem",
    subcategory: "Boca",
    image:
      "https://drive.google.com/thumbnail?id=1WRqxaTRd6dEp9ZYwD7PBthaFoq_iVBQB&sz=w1000", // Substituir imagem
    description:
      "Glosses labiais em embalagem divertida de 'doces', com brilho intenso e partículas de glitter. Cores/sabores sortidos como frutas.",
    notes: {
      top: [],
      heart: [],
      base: [
        "Glitter",
        "Brilho Labial",
        "Cheirinho de Frutas/Doces",
      ],
    },
  },
  {
    name: "Brilho Labial",
    brand: "Sarah's Beauty",
    price: "R$ 10,00",
    category: "Maquiagem",
    subcategory: "Boca",
    image:
      "https://drive.google.com/thumbnail?id=1qVY2FXSuEXRQ-jIq9hv-fhVlbnHpiyQ_&sz=w1000",
    description:
      "Glosses líquidos com cores e microbrilhos cintilantes (vermelho, pink, nude), para hidratação e volume nos lábios. Possui fragrância suave.",
    notes: {
      top: [],
      heart: [],
      base: ["Brilho", "Cintilante", "Volume"],
    },
  },
];

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] =
    useState<string>("Perfumaria");
  const [productTypeFilter, setProductTypeFilter] =
    useState<string>("Todos"); // Body Splash, Brand
  const [subcategoryFilter, setSubcategoryFilter] = useState<
    string[]
  >([]); // Array para múltipla seleção de gênero
  const [showFilters, setShowFilters] = useState(false); // Controlar visibilidade dos filtros
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(8); // Mostrar 9 produtos inicialmente (3 colunas x 3 linhas)

  // Initialize default products and load from storage on mount
  useEffect(() => {
    initializeDefaultProducts(initialProductsData);
    loadProducts();
  }, []);

  const loadProducts = () => {
    const loadedProducts = ProductStore.getProducts();
    setProducts(loadedProducts);
  };

  // Fast slideshow automation for luxury gallery
  useEffect(() => {
    const totalSlides = 4;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 2500); // Troca a cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  // Check if admin mode is requested via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setShowAdmin(true);
    }
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.name === product.name &&
        item.brand === product.brand,
    );

    if (existingItemIndex >= 0) {
      // Item exists, increase quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      toast.success(`${product.name} - quantidade atualizada!`);
    } else {
      // New item, add to cart
      const cartItem: CartItem = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        category: product.category,
        productType: product.productType,
        quantity: 1,
      };
      setCartItems([...cartItems, cartItem]);
      toast.success(`${product.name} adicionado ao carrinho!`);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    toast.info("Produto removido do carrinho");
  };

  const handleUpdateQuantity = (
    index: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.info("Carrinho limpo");
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setProductTypeFilter("Todos"); // Reset product type when main category changes
    setSubcategoryFilter([]); // Reset subcategory when main category changes
    setShowFilters(false); // Hide filters when category changes
    setVisibleProducts(8); // Reset visible products count
  };

  const handleProductTypeChange = (value: string) => {
    setProductTypeFilter(value);
    setSubcategoryFilter([]); // Reset gender filter when product type changes
    setVisibleProducts(8); // Reset visible products count
  };

  const handleSubcategoryToggle = (value: string) => {
    setSubcategoryFilter((prev) => {
      if (prev.includes(value)) {
        // Remove se já estiver selecionado
        return prev.filter((item) => item !== value);
      } else {
        // Adiciona se não estiver selecionado
        return [...prev, value];
      }
    });
    setVisibleProducts(8); // Reset visible products count
  };

  // Apply all filters
  let filteredProducts = products;

  // Filter by main category (sempre aplica, não tem mais "Todos")
  filteredProducts = filteredProducts.filter(
    (product) => product.category === categoryFilter,
  );

  // PERFUMARIA - Filter by product type (Body Splash, Brand)
  if (categoryFilter === "Perfumaria") {
    if (productTypeFilter !== "Todos") {
      filteredProducts = filteredProducts.filter(
        (product) => product.productType === productTypeFilter,
      );
    }
    // When "Todos" is selected, show all product types (no filtering by productType)

    // Filter by gender (Masculino, Feminino, Unissex) - múltipla seleção
    if (subcategoryFilter.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        subcategoryFilter.includes(product.subcategory || ""),
      );
    }
  }

  // MAQUIAGEM e AUTOCUIDADO - Filter by subcategory - múltipla seleção
  if (
    (categoryFilter === "Maquiagem" ||
      categoryFilter === "Autocuidado") &&
    subcategoryFilter.length > 0
  ) {
    filteredProducts = filteredProducts.filter((product) =>
      subcategoryFilter.includes(product.subcategory || ""),
    );
  }

  // Get product types based on main category (2nd level filter)
  const getProductTypes = () => {
    if (categoryFilter === "Perfumaria") {
      return ["Todos", "Comum", "Body Splash", "Brand"];
    }
    return [];
  };

  // Get subcategories/gender based on main category (3rd level filter)
  const getSubcategories = () => {
    if (categoryFilter === "Perfumaria") {
      return ["Feminino", "Masculino", "Unissex"];
    } else if (categoryFilter === "Maquiagem") {
      return ["Rosto", "Olhos", "Boca", "Acessórios"];
    } else if (categoryFilter === "Autocuidado") {
      return ["Corpo", "Rosto"];
    }
    return [];
  };

  const productTypes = getProductTypes();
  const subcategories = getSubcategories();

  // Show admin page if requested
  if (showAdmin) {
    return (
      <AdminPage
        onBackToSite={() => {
          setShowAdmin(false);
          // Remove admin param from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("admin");
          window.history.replaceState({}, "", url.toString());
        }}
        onProductsChange={loadProducts}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="pt-0 pb-0 px-0 relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://drive.google.com/thumbnail?id=1u_wq0NLYhHXhy1uNFdC7wxQvKN-FGclV&sz=w3000"
            alt="Luxury Perfume"
            className="w-full min-h-screen object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70 bg-blend-overlay md:bg-black/40"></div>
        </div>

        <div className="container relative w-full z-10 px-[10px] py-[0px] mx-[20px] my-[0px] m-[0px]">
          <div className="grid grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="md:text-6xl text-white tracking-tight leading-tight font-[Noto_Serif_Display] text-[50px]">
                PERFUMES DE LUXO
              </h2>
              <p className="text-gray-200 max-w-md leading-relaxed text-[16px]">
                Descubra aromas que refletem elegância e
                sutileza, com notas inspiradas na perfumaria
                árabe e internacional.
              </p>
              <Button
                onClick={() =>
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] shadow-lg shadow-[#C9A14A]/20 hover:shadow-[#C9A14A]/40 text-black px-10 py-6 transition-all duration-300 rounded-none uppercase tracking-wider"
              >
                Ver Catálogo
              </Button>
            </div>

            {/* Right side - empty to let background image show */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        id="catalog"
        className="py-24 px-4 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            {/* Decorative top line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent w-32"></div>
              <div className="w-2 h-2 bg-[#C9A14A] rotate-45 mx-4"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent w-32"></div>
            </div>

            <h2 className="text-5xl text-white mb-4 tracking-tight">
              Nosso Catálogo
            </h2>
            <p className="text-[#C9A14A]/80 tracking-wide uppercase text-sm">
              Explore nossa coleção de fragrâncias de luxo
            </p>

            {/* Decorative bottom line */}
            <div className="flex items-center justify-center mt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A14A]/50 to-transparent w-24"></div>
            </div>
          </div>

          {/* Main Category Tabs */}
          <div className="flex justify-center mb-6">
            <Tabs
              value={categoryFilter}
              onValueChange={handleCategoryChange}
              className="w-full max-w-3xl"
            >
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] border border-[#C9A14A]/30 p-1 rounded-none h-12">
                <TabsTrigger
                  value="Perfumaria"
                  className="text-[#C9A14A]/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase tracking-wider text-[14px] rounded-none transition-colors duration-200"
                >
                  Perfumaria
                </TabsTrigger>
                <TabsTrigger
                  value="Maquiagem"
                  className="text-[#C9A14A]/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase text-[14px] tracking-wider rounded-none transition-colors duration-200"
                >
                  Maquiagem
                </TabsTrigger>
                <TabsTrigger
                  value="Autocuidado"
                  className="text-[#C9A14A]/70 text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A14A] data-[state=active]:to-[#B69142] data-[state=active]:text-black uppercase tracking-wider text-[14px] rounded-none transition-colors duration-200"
                >
                  Autocuidado
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Botão Exibir Filtros */}
          {(productTypes.length > 0 ||
            subcategories.length > 0) && (
              <div className="flex justify-center mb-6">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] hover:from-[#3A3A3A] hover:to-[#2A2A2A] border border-[#C9A14A]/30 text-[#C9A14A] px-8 py-3 rounded-none uppercase tracking-widest text-xs transition-all duration-300 flex items-center gap-2"
                >
                  {showFilters ? (
                    <>
                      Ocultar Filtros
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Exibir Filtros
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

          {/* Product Type Tabs (2nd level - Body Splash, Brand Collection) */}
          <AnimatePresence>
            {showFilters && productTypes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-center gap-3 mb-6">
                  <Tabs
                    value={productTypeFilter}
                    onValueChange={handleProductTypeChange}
                    className="w-full max-w-2xl"
                  >
                    {/* Primeira linha - TODOS (grande) */}
                    <div className="flex justify-center mb-3">
                      <TabsList className="bg-transparent border-0 p-0">
                        <TabsTrigger
                          value="Todos"
                          className="min-w-[280px] px-6 py-3 bg-transparent border border-[#8B7355]/20 text-[#8B7355]/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B7355]/40 data-[state=active]:via-[#C9A14A]/30 data-[state=active]:to-[#8B7355]/40 data-[state=active]:text-[#C9A14A] data-[state=active]:border-[#C9A14A]/60 uppercase tracking-wider text-xs sm:text-sm rounded-none transition-all duration-300 hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                        >
                          Todos
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Segunda linha - Body Splash / Brand */}
                    <div className="flex justify-center">
                      <TabsList className="flex gap-2 bg-transparent border-0 p-0">
                        {productTypes
                          .filter((type) => type !== "Todos")
                          .map((type) => (
                            <TabsTrigger
                              key={type}
                              value={type}
                              className="px-5 py-2 bg-transparent border border-[#8B7355]/20 text-[#8B7355]/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#8B7355]/40 data-[state=active]:via-[#C9A14A]/30 data-[state=active]:to-[#8B7355]/40 data-[state=active]:text-[#C9A14A] data-[state=active]:border-[#C9A14A]/60 uppercase tracking-wider text-[10px] sm:text-xs rounded-none transition-all duration-300 whitespace-nowrap hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                            >
                              {type}
                            </TabsTrigger>
                          ))}
                      </TabsList>
                    </div>
                  </Tabs>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gender/Subcategory Toggle Buttons (3rd level - seleção múltipla) */}
          <AnimatePresence>
            {showFilters && subcategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.3,
                  delay: productTypes.length > 0 ? 0.1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-center gap-3 mb-10">
                  <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                      {subcategories.map((subcategory) => (
                        <Button
                          key={subcategory}
                          onClick={() =>
                            handleSubcategoryToggle(subcategory)
                          }
                          variant="outline"
                          className={`min-w-[80px] px-4 py-2 border rounded-none transition-all duration-300 uppercase tracking-wider text-[10px] sm:text-xs ${subcategoryFilter.includes(
                            subcategory,
                          )
                            ? "bg-gradient-to-r from-[#8B7355]/40 via-[#C9A14A]/30 to-[#8B7355]/40 text-[#C9A14A] border-[#C9A14A]/60"
                            : "bg-transparent border-[#8B7355]/20 text-[#8B7355]/50 hover:border-[#8B7355]/40 hover:text-[#8B7355]/70"
                            }`}
                        >
                          {subcategory}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="px-2 sm:px-4 md:px-8 lg:px-16 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-[1.125rem]">
              {filteredProducts
                .slice(0, visibleProducts)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onViewDetails={() =>
                      handleViewDetails(product)
                    }
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
            </div>

            {/* Load More Button */}
            {visibleProducts < filteredProducts.length && (
              <div className="flex justify-center mt-12 mb-8">
                <Button
                  onClick={() =>
                    setVisibleProducts((prev) => prev + 9)
                  }
                  className="bg-gradient-to-r from-[#C9A14A] to-[#B69142] hover:from-[#B69142] hover:to-[#A67F38] text-black px-12 py-6 rounded-none uppercase tracking-widest shadow-lg shadow-[#C9A14A]/30 hover:shadow-[#C9A14A]/50 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-black/20"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-black/20"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-black/20"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-black/20"></div>

                  <span className="relative z-10">
                    Carregar Mais Produtos
                  </span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Luxury Gallery Section - Fast Upward Carousel */}
      <section className="py-0 overflow-hidden bg-[#1A1A1A] h-96 relative">
        <div className="relative w-full h-full">
          <AnimatePresence initial={false}>
            {activeSlide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="absolute inset-0 will-change-transform"
              >
                <ImageWithFallback
                  src="https://drive.google.com/thumbnail?id=1z_F_0MsBA9b6kGP07GWwhY4Wlw9szFpt&sz=w3000"
                  alt="Monochromatic Lifestyle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
              </motion.div>
            )}

            {activeSlide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="absolute inset-0 will-change-transform"
              >
                <ImageWithFallback
                  src="https://drive.google.com/thumbnail?id=1p1DhAMta9K-CmQcCwM02MAvwjHfWipp2&sz=w3000"
                  alt="Row of Luxury Perfumes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
              </motion.div>
            )}

            {activeSlide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="absolute inset-0 will-change-transform"
              >
                <ImageWithFallback
                  src="https://drive.google.com/thumbnail?id=1OLCm4tMbmOt_X-cgzU6KzXoWAS6M2gC-&sz=w3000"
                  alt="Red Tones Fragrance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
              </motion.div>
            )}

            {activeSlide === 3 && (
              <motion.div
                key="slide-3"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: "linear" }}
                className="absolute inset-0 will-change-transform"
              >
                <ImageWithFallback
                  src="https://drive.google.com/thumbnail?id=1QihvFHsotudEEbrz2YZWcxgV57nkluty&sz=w3000"
                  alt="Golden Perfumes Table"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Dialog */}
      {selectedProduct && (
        <ProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          product={selectedProduct}
          onAddToCart={() => handleAddToCart(selectedProduct)}
        />
      )}

      {/* Footer */}
      <footer className="py-16 px-4 bg-[#1A1A1A]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo e Redes Sociais */}
            <div className="space-y-4">
              <img
                src={logoAmevi}
                alt="Amevi"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-gray-300 text-sm">
                Sofisticação em cada fragrância
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.me/558598039134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#C9A14A] flex items-center justify-center hover:bg-[#B69142] transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5 text-black" />
                </a>
                <a
                  href="https://instagram.com/ameviis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#C9A14A] flex items-center justify-center hover:bg-[#B69142] transition-colors"
                >
                  <Instagram className="h-5 w-5 text-black" />
                </a>
              </div>
            </div>

            {/* Produtos */}
            <div>
              <h3 className="text-white mb-4">Produtos</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Perfumes Importados</li>
                <li>Perfumes Árabes</li>
                <li>Body Splash</li>
                <li>Maquiagem</li>
                <li>Skincare</li>
                <li>Acessórios de Beleza</li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-white mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Maracanaú - CE</li>
                <li className="pt-2">Tel: (85) 99803-9134</li>
              </ul>
            </div>

            {/* Horário de Funcionamento */}
            <div>
              <h3 className="text-white mb-4">
                Horário de Funcionamento
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Segunda a Domingo: 9h às 19h</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-[#C9A14A]/20">
            <div className="text-center text-sm text-gray-300">
              <p>
                © 2025 Amevi. Todos os direitos reservados.
              </p>
            </div>

            {/* Admin Access (discreet link) */}
            <button
              onClick={() => setShowAdmin(true)}
              className="hidden mt-4 text-[#C9A14A]/30 hover:text-[#C9A14A] transition-colors text-xs flex items-center gap-1 mx-auto"
            >
              <Settings className="h-3 w-3" />
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Toaster */}
      <Toaster />
    </div>
  );
}