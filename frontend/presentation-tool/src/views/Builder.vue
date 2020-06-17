<template>
    <div>
        <toolbar></toolbar>
        <stepper></stepper>
    </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import Stepper from "@/components/organisms/ProgressStepper.vue"

export default {
    components:{
        Toolbar,
        Stepper,
    }
}
</script>