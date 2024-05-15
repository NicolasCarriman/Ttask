import { z } from "zod";
import { TimeInterval, EveryInterval } from "@core/models";

const timeIntervalEnum = z.nativeEnum(TimeInterval);
const everyIntervalEnum = z.nativeEnum(EveryInterval);
export type TimeIntervalEnum = z.infer<typeof timeIntervalEnum>;
export type EveryIntervalEnum = z.infer<typeof everyIntervalEnum>;

const manualTimeSchema = z.object({
  dateRange: z.object(
    {
      from: z.string().date(),
      to: z.string().date(),
    },
    {
      required_error: 'Please select a date range'
    }
  )
}).refine((data) => data.dateRange.from < data.dateRange.to, {
  path: ["dateRange"],
  message: "From date must be before to date"
});

const automaticTimeSchema = z.object({
  dateRange: z.object(
    {
      from: z.string().date(),
      to: z.string().date(),
    },
    {
      required_error: 'Please select a date range'
    }
  ),
  frecuencyRange: z.object(
    {
      times: timeIntervalEnum,
      every: everyIntervalEnum,
    },
    {
      required_error: 'Please select a time interval'
    }
  )
}).refine((data) => data.dateRange.from < data.dateRange.to, {
  path: ["dateRange"],
  message: "From date must be before to date"
});

