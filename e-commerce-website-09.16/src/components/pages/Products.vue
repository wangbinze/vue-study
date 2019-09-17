<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModel(true)">建立新的产品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分类</th>
        <th>产品名称</th>
        <th width="120">原价</th>
        <th width="120">售价</th>
        <th width="100">是否启用</th>
        <th width="80">编辑</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{ item.origin_price}}</td>
          <td class="text-right">{{ item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">启用</span>
            <span v-else>未启用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModel(false,item)">编辑</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModel(item)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- 头部 -->
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增或修改产品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- 主体 -->
          <div class="modal-body">
            <div class="row">
              <!-- 左侧 -->
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">输入图片网址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.image"
                    placeholder="请输入图片连接"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上传图片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" />
                  <!-- <img
                    img="https://img.zcool.cn/community/0145185615dd766ac7255b14772555.jpg@1280w_1l_0o_100sh.jpg"
                    class="img-fluid"
                    alt="示例"
                  />-->
                </div>
              </div>

              <!-- 右侧 -->
              <div class="col-sm-8">
                <div class="form-grop">
                  <label for="title">标题</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="请输入标题"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分类</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="请输入分类"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">单位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="请输入单位"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin-price">原价</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin-price"
                      v-model="tempProduct.origin_price"
                      placeholder="请输入原价"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售价</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="请输入售价"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="descript ion">产品描述</label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="请输入产品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">说明内容</label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="请输入说明内容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check"></div>
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >是否启用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">确认</button>
          </div>
        </div>
      </div>
    </div>

    <!-- delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dia log"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>删除产品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="moda l-body">
            是否删除
            <strong class="textdanger">{{ tempProduct.title }}</strong> 商品（删除后将无法恢复）
          </div>
          <div class="modal- footer">
            <button type="button" class="btn btn-outline-light" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger" @click="delProduct()">确认</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false
    };
  },
  methods: {
    getProducts() {
      const api = "https://vue-course-api.herokuapp.com/api/binzetest/products";
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    openModel(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    // 删除
    openDelModel(item) {
        $("#deleteModal").modal("show");
        this.tempProduct=Object.assign({},item)
    },
    delProduct(){
        const vm = this;
        const url = `https://vue-course-api.herokuapp.com/api/binzetest/admin/product/${vm.tempProduct.id}`;
        this.$http.delete(url).then((response)=>{
            console.log(response,vm.tempProduct);
            $("#deleteModal").modal("hide");
            vm.isLoading=false;
            this.getProducts();
        })
    },
    // 新增和修改
    updateProduct() {
      let api = `https://vue-course-api.herokuapp.com/api/binzetest/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `https://vue-course-api.herokuapp.com/api/binzetest/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失败");
        }
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>