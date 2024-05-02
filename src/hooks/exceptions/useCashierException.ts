import { useEffect } from "react";
import { useOperationProcess } from "../../store/operatingPeriod/operatingPeriod.store";

export default function UseCashierException(openModal: any) {
  const periodsArray = useOperationProcess((state) => state.operatingPeriod);
  const currentPeriod = periodsArray ? periodsArray[0] : null;

  //OperatingPeriod confirm
  const getCurrentPeriod = useOperationProcess(
    (state) => state.getCurrentPeriod
  );
  useEffect(() => {
    if (!currentPeriod) {
      getCurrentPeriod();
      return;
    }
    if (!currentPeriod.cashierSession?.length) {
      openModal();
    }
  }, [periodsArray]);
}
