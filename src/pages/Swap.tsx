import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowDownUp, Wallet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Swap = () => {
  const balances = [
    { label: "Active Wallet Balance", value: "0 T369" },
    { label: "Validator Balance", value: "0 T369" },
    { label: "Affiliate Balance", value: "0 T369" },
  ];

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
        {balances.map((balance) => (
          <Card key={balance.label} className="p-4 glass-card">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">{balance.label}</p>
              <p className="font-bold">{balance.value}</p>
            </div>
          </Card>
        ))}

        <Card className="p-6 glass-card">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                How many tokens do you want to get?
              </label>
              <Input
                type="number"
                placeholder="0"
                className="bg-platform-card border-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">You pay</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0"
                  className="bg-platform-card border-white/10"
                />
                <Select>
                  <SelectTrigger className="w-40 bg-platform-card border-white/10">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="t369">T369</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-platform-green text-black hover:bg-platform-green-dark">
              Swap Now
            </Button>
          </div>
        </Card>

        <div className="text-sm text-gray-400">
          <h3 className="font-semibold mb-2">Last Deposits</h3>
          <p className="text-center py-4">No data at the moment</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Swap;