"use client";

import { useId, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function CalenderENInput() {
	const id = useId();
	const [date, setDate] = useState<DateRange | undefined>();

	return (
		<div>
			<div className="*:not-first:mt-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id={id}
							variant="outline"
							className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]">
							<span className={cn("truncate", !date && "text-muted-foreground")}>
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
										</>
									) : (
										format(date.from, "LLL dd, y")
									)
								) : (
									"Pick a date range"
								)}
							</span>
							<CalendarIcon
								size={16}
								className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
								aria-hidden="true"
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-2" align="start">
						<Calendar mode="range" selected={date} onSelect={setDate} />
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
