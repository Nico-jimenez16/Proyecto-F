<template>
  <div id="footer">
    <footer class="w-full block absolote bottom-0 md:flex justify-center items-center bg-[#2c3e50] h-auto lg:h-40 text-[#fff]">
      <div class="w-full md:w-1/2 flex flex-col items-center pt-2 md:ml-8">
        <h3 class="text-xl font-bold">Contacto</h3>
        <div class="flex flex-col">
          <div class="flex justify-start items-center mt-1">
            <img class="w-6 mr-2" src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png" alt="mail">
            <a href="mailto:jimeneznicolas520@gmail.com" target="_blank" >{{ mail }}</a>
          </div>
          <div class="flex justify-start items-center mt-1">
            <img class="w-6 mr-2" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="">
            <a href="https://www.linkedin.com/in/jimenez-nicolas/" target="_blank" >{{ linkedin }}</a>
          </div>
          <div class="flex justify-start items-center mt-1">
            <img class="w-6 mr-2" src="https://cdn-icons-png.flaticon.com/512/455/455907.png" alt="">
            <a href="tel:3856494394" >{{ phone }}</a>
          </div>
        </div>
      </div>
      <div class="w-full mt-4 pb-2 md:pt-2 md:mt-0 md:w-1/2">
        <h3 class="text-xl font-bold">Proyecto VueJs</h3>
        <h3 class="text-xl lg:text-3xl font-bold">Angel Nicolas Jimenez</h3>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            mail: 'jimeneznicolas520@gmail.com',
            linkedin: 'linkedin.com/in/jimenez-nicolas/',
            phone: 3856494394
        }
    }
}
</script>