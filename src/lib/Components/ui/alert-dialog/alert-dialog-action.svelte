<script>
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/Components/ui/button/index.js";
	import { cn } from "$lib/Utils.js";

	let { class: className, ref = $bindable(null), ...restProps } = $props();
</script>

<AlertDialogPrimitive.Action bind:ref class={cn(buttonVariants(), className)} {...restProps} />
