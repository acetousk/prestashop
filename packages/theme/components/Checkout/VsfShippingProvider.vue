<template>
  <div>
    <SfLoader :class="{ loading }" :loading="loading">
      <div>
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="method in shippingMethods"
      :key="method.value"
      :label="method.label"
      :value="method.value"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.value)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>

      <div class="shipping__description">
        {{ method.description }}
      </div>
    </SfRadio>
      </div>
    </SfLoader>
    <div class="summary__action">
      <SfButton
        type="button"
        class="sf-button color-secondary summary__back-button"
        @click.prevent="$emit('go-back')"
      >
        {{ $t('Go back') }}
      </SfButton>
    <SfButton
      v-e2e="'continue-to-payment'"
      :disabled="!selectedMethod"
      type="button"
      @click="goToPayment"
    >
      {{ $t('Continue to payment') }}
    </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfLink, SfLoader } from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { useShippingProvider } from '@vue-storefront/moqui';
import { shippingProviderGetters } from '@vue-storefront/moqui';

export default {
  name: 'VsfShippingProvider',
  props: ['selectedAddress'],
  components: {
    SfButton,
    SfRadio,
    SfLink,
    SfLoader
  },
  setup(props, context) {
    const selectedMethod = ref(null);
    const { load, state, save, loading } = useShippingProvider();
    const selectMethod = async(method) => {
      selectedMethod.value = method;
    };
    const goToBilling = async () => {
      const shippingMethod = { carrierId: selectedMethod.value.endsWith(',') ? selectedMethod.value.slice(0, -1) : selectedMethod.value, addressId: props.selectedAddress };
      await save({ shippingMethod });
      // console.log('VsfShippingProvider goToBilling');
      context.root.$router.push({ path: 'billing' });
    };
    const goToPayment = async () => {
      const shippingMethod = { carrierId: selectedMethod.value.endsWith(',') ? selectedMethod.value.slice(0, -1) : selectedMethod.value, addressId: props.selectedAddress };
      await save({ shippingMethod });
      // console.log('VsfShippingProvider goToBilling');
      context.root.$router.push({ path: 'payment' });
    };

    const shippingProvidersList = computed(()=> state.value ? shippingProviderGetters.getShippingProvidersList(state.value) : []);
    const loadShippingProviders = async () => {
      await load();
    };
    loadShippingProviders();
    return {
      shippingMethods: shippingProvidersList,
      selectedMethod,
      selectMethod,
      goToPayment,
      goToBilling,
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
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}

</style>
