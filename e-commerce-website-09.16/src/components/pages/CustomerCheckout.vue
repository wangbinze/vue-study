<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md6" @submit.prevent="payOrder">
      <!-- 商品信息 -->
      <table class="table">
        <thead>
          <th>品名</th>
          <th>数量</th>
          <th class="text-right">单价</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
            <td
              class="align-middle text-right"
            >{{ item.final_total / item.qty }}元/{{ item.product.unit }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">总计：</td>
            <td class="text-right">{{order.total}}元</td>
          </tr>
        </tfoot>
      </table>

      <!-- 买家信息 -->
      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人电话</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order. user.address }}</td>
          </tr>
          <tr>
            <th>付款状态</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">确认付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
  }
};
</script>

<style lang="scss" scoped>
</style>