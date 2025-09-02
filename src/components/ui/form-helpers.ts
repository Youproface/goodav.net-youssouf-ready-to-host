import { FieldPath, FieldValues, ControllerProps } from "react-hook-form"
import { createContext } from "react"

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export type FormItemContextValue = {
  id: string
}

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export type ControllerPropsAny = ControllerProps<FieldValues, FieldPath<FieldValues>>
