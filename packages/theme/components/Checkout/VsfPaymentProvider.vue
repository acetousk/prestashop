<template>
  <div>
    <SfLoader :class="{ loading }" :loading="loading">
      <div>
    <SfRadio
      v-e2e="'payment-method'"
      v-for="method in paymentMethods"
      :key="method.id"
      :label="method.label"
      :value="method.name"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.name)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>
    </SfRadio>
      </div>
    </SfLoader>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfLoader } from '@storefront-ui/vue';
import { ref, onBeforeMount, computed, watch } from '@nuxtjs/composition-api';
import { usePayment } from '@vue-storefront/moqui';
import { paymentProviderGetters } from '@vue-storefront/moqui';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio,
    SfLoader
  },

  setup(_props, context) {
    const { load, payment, loading } = usePayment();
    onBeforeMount(async() => await load());

    const selectedMethod = ref(null);
    watch(selectedMethod, (newVal) => {
      context.emit('changeSelectedMethod', newVal);
    });
    const selectMethod = (method)=> {
      selectedMethod.value = method;
    };

    return {
      paymentMethods: computed(() => payment.value ? paymentProviderGetters.getPaymentProvidersList(payment.value) : []),
      selectedMethod,
      selectMethod,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
