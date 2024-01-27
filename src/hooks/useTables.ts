import { useEffect, useState } from "react";
import axios from "axios";

export default function UseTables() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState();

  const getTables = async () => {
    setIsLoading(true);
    try {
      const res = await axios("");
    } catch (error) {}
  };
}
