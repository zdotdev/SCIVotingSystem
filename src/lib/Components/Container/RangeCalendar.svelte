<script>
    import { RangeCalendar } from "$lib/Components/ui/range-calendar/index";
    import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";

    export let electionEnd = "";
    export let electionStart = "";
    const convertToCalendarDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date string: ${dateString}`);
        }

        return new CalendarDate(
            date.getUTCFullYear(),
            date.getUTCMonth() + 1,
            date.getUTCDate()
        );
    };

    let start, end;
    try {
        start = convertToCalendarDate(electionStart);
        end = convertToCalendarDate(electionEnd);
    } catch (error) {
        const todayDate = today(getLocalTimeZone());
        start = todayDate;
        end = todayDate;
    }

    $: value = {
        start,
        end
    };
</script>
<RangeCalendar bind:value class="rounded-md border shadow" />