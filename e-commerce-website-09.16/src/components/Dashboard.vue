<template>
  <div>
    <Navbar></Navbar>
    <AlertMessage></AlertMessage> 
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AlertMessage from './AlertMessage';
export default {
  components: {
    Sidebar,
    Navbar,
    AlertMessage,
  }
};
</script>