import React from 'react';
import { DollarSign, EuroIcon, IndianRupee } from 'lucide-react';

type CurrencyIconProps = {
  icon: "IndianRupee" | "DollarSign" | "EuroIcon"; // Accept specific string values
  size?: number; // Optional size prop
};

const iconMap: Record<CurrencyIconProps['icon'], React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  IndianRupee,  // Use the correct icon names
  DollarSign,
  EuroIcon,
};

const CurrencyIcon: React.FC<CurrencyIconProps> = ({ icon, size = 24 }) => {
  const Icon = iconMap[icon]; // Get the corresponding icon component
  return <Icon width={size} height={size} />; // Pass width and height to the icon
};

export default CurrencyIcon;
