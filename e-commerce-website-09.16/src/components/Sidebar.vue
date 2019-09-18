<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <!-- <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <span data-feather="home"></span>
              Dashboard
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>-->

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理员</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin/products"
              :class="{'active': this.$route.path == `/admin/products`}"
            >
              <i class="fas fa-box-open"></i>
              产品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin/orders"
              :class="{'active': this.$route.path == `/admin/orders`}"
            >
              <i class="fas fa-clipboard-list"></i>
              订单列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/admin/coupons"
              :class="{'active': this.$route.path == `/admin/coupons`}"
            >
              <i class="fas fa-ticket-alt"></i>
              优惠券
            </router-link>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模拟功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link
              to="/customer_order"
              class="nav-link"
              :class="{'active': this.$route.path == `/customer_order`}"
            >
              <i class="fas fa-shopping-cart"></i>
              模拟订单
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>