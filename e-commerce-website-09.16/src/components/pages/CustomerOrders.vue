<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position:center;"
            :style="{ backgroundImage: `url(${ item.image })` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.unit }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 显示仅有原价的 -->
              <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
              <!-- 显示有原价有优惠价的 -->
              <del class="h6" v-if="item.price">原价 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">现在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCar(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到购物车
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="productModel"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if=" !product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原价 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">现在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">选择 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小计
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addtoCar(product.id,product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.isLoadingItem"></i>加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- cart -->
    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>数量</th>
            <th class="text-right">单价</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{item.product.title}}
                <div class="text-success" v-if="item.coupon">已套用优惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
              <td
                class="align-middle text-right"
              >{{ item.final_total/item.qty }}元/{{item.product.unit}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">总计：</td>
              <td class="text-right">{{cart.total}} 元</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total ">
              <td colspan="3" class="text-right text-success">折扣价</td>
              <td class="text-right text-success">{{ cart.final_total }} 元</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="请输入优惠券码" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用优惠码</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交表单 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="请输入 Email"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
          />
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="请输入姓名"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('name')}"
          />
          <span class="text-danger" v-if="errors.has('name')">姓名必须输入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人电话</label>
          <input
            type="tel"
            class="form-control"
            name="tel"
            id="usertel"
            v-model="form.user.tel"
            placeholder="请输入电话"
            v-validate="'digits:11'"
            :class="{'is-invalid': errors.has('tel')}"
          />
          <span class="text-danger" v-if="errors.has('tel')">电话必须输入正确</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="address"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="请输入地址"
            v-validate="'required'"
            :class="{'is-invalid': errors.has('address')}"
          />
          <span class="text-danger" v-if="errors.has('address')">地址栏位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>

        <div class="text-right">
          <button class="btn btn-danger">送出订单</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [], // 全部产品
      product: {}, // 单一产品
      status: {
        loadingItem: ""
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      isLoading: false,
      cart: {},
      coupon_code: "",
      pagination: {}
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/products?page=${page}`;
      const vm = this;
      //console.log("APIPATH",process.env.APIPATH,"CUSTOMPATH",process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("products", response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/product/${id}`;
      const vm = this;
      //console.log("APIPATH",process.env.APIPATH,"CUSTOMPATH",process.env.CUSTOMPATH);
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        $("#productModel").modal("show");
        console.log(response);
        vm.status.loadingItem = "";
      });
    },
    addtoCar(id, qty = 1) {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        vm.getCar();
        $("#productModel").modal("hide");
      });
    },
    getCar() {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        vm.getCart();
        // console.log(response);
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then(() => {
        vm.getCart();
        // console.log(response);
        vm.isLoading = false;
      });
    },
    createOrder() {
      const api = `https://vue-course-api.herokuapp.com/api/binzetest/order`;
      const vm = this;
      const order = vm.form;
      //   vm.isLoading = true;  //这个要拿掉不然影响界面
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(response => {
            console.log("订单已建立", response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("信息不完整");
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCar();
  }
};
</script>

<style lang="scss" scoped>
</style>