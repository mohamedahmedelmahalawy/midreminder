"use client";

import React, { useId, forwardRef } from "react";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PhoneInputOriginProps = {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	name?: string;
	[key: string]: any;
};

const PhoneInputOrigin = forwardRef<
	HTMLInputElement,
	PhoneInputOriginProps
>(({ className, value, onChange, name, ...props }, ref) => {
	const id = useId();

	// Bridge react-phone-number-input's onChange to react-hook-form's event signature
	const handleChange = (phoneValue?: string) => {
		if (onChange) {
			const safeValue = typeof phoneValue === "string" ? phoneValue : "";
			// Call onChange with just the value, as react-phone-number-input expects
			onChange(safeValue);
		}
	};

	return (
		<div className='*:not-first:mt-2' dir='ltr'>
			<Label htmlFor={id}>Telephone</Label>
			<RPNInput.default
				className='flex rounded-md shadow-xs'
				defaultCountry='EG'
				international
				flagComponent={FlagComponent}
				countrySelectComponent={CountrySelect}
				inputComponent={(inputProps) => (
					<PhoneInput ref={ref} {...inputProps} {...props} />
				)}
				id={id}
				value={value as string}
				onChange={handleChange}
			/>
		</div>
	);
});

PhoneInputOrigin.displayName = "PhoneInputOrigin";
export default PhoneInputOrigin;

const PhoneInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, ...props }, ref) => {
		return (
			<Input
				ref={ref}
				data-slot='phone-input'
				className={cn(
					"-ms-px rounded-s-none shadow-none focus-visible:z-10",
					className
				)}
				{...props}
			/>
		);
	}
);
PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
	disabled,
	value,
	onChange,
	options,
}: CountrySelectProps) => {
	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as RPNInput.Country);
	};

	return (
		<div className='border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50'>
			<div className='inline-flex items-center gap-1' aria-hidden='true'>
				<FlagComponent country={value} countryName={value} aria-hidden='true' />
				<span className='text-muted-foreground/80'>
					<ChevronDownIcon size={16} aria-hidden='true' />
				</span>
			</div>
			<select
				disabled={disabled}
				value={value}
				onChange={handleSelect}
				className='absolute inset-0 text-sm opacity-0'
				aria-label='Select country'
			>
				<option key='default' value=''>
					Select a country
				</option>
				{options
					.filter((x) => x.value)
					.map((option, i) => (
						<option key={option.value ?? `empty-${i}`} value={option.value}>
							{option.label}{" "}
							{option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
						</option>
					))}
			</select>
		</div>
	);
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];
	return (
		<span className='w-5 overflow-hidden rounded-sm'>
			{Flag ? (
				<Flag title={countryName} />
			) : (
				<PhoneIcon size={16} aria-hidden='true' />
			)}
		</span>
	);
};
