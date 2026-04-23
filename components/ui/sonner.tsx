"use client"

import {
  CheckCircle,
  Info,
  CircleNotch,
  XCircle,
  Warning,
} from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "toast-custom",
          title: "toast-title",
          description: "toast-description",
          actionButton: "toast-action",
          cancelButton: "toast-cancel",
          closeButton: "toast-close",
        },
      }}
      icons={{
        success: <CheckCircle className="size-5" weight="fill" />,
        info: <Info className="size-5" weight="fill" />,
        warning: <Warning className="size-5" weight="fill" />,
        error: <XCircle className="size-5" weight="fill" />,
        loading: <CircleNotch className="size-5 animate-spin" weight="bold" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
