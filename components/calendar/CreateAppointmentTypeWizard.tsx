"use client";

import * as React from "react";
import { CreateAppointmentTypeDialog } from "./CreateAppointmentTypeDialog";
import { AppointmentScheduleDialog } from "./AppointmentScheduleDialog";
import { AppointmentSettingsDialog } from "./AppointmentSettingsDialog";

interface CreateAppointmentTypeWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAppointmentTypeWizard({
  open,
  onOpenChange,
}: CreateAppointmentTypeWizardProps) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [formData, setFormData] = React.useState<any>({});
  const [scheduleData, setScheduleData] = React.useState<any>(null);

  const handleStep1Submit = (data: any) => {
    setFormData(data);
    setStep(2);
  };

  const handleStep2Submit = (schedule: any) => {
    setScheduleData(schedule);
    setStep(3);
  };

  const handleStep3Submit = (settings: any) => {
    const finalData = {
      ...formData,
      schedule: scheduleData,
      settings,
    };
    console.log("Final appointment type:", finalData);
    // API call here
    onOpenChange(false);
    // Reset
    setStep(1);
    setFormData({});
    setScheduleData(null);
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // Reset wizard when closed
      setStep(1);
      setFormData({});
      setScheduleData(null);
    }
  };

  return (
    <>
      {step === 1 && (
        <CreateAppointmentTypeDialog
          open={open}
          onOpenChange={handleOpenChange}
          onSubmit={handleStep1Submit}
        />
      )}
      {step === 2 && (
        <AppointmentScheduleDialog
          open={open}
          onOpenChange={handleOpenChange}
          onBack={handleBack}
          onSubmit={handleStep2Submit}
        />
      )}
      {step === 3 && (
        <AppointmentSettingsDialog
          open={open}
          onOpenChange={handleOpenChange}
          onBack={handleBack}
          onSubmit={handleStep3Submit}
        />
      )}
    </>
  );
}
