

<template>
  <div>
    <!--Categories Filter -->
    <div class="flex flex-wrap items-center mb-6">
      <div class="flex-grow">
        <div class="flex flex-wrap ">
          <h2 class="font-bold"
              style="line-height: 48px !important; display:flex;  vertical-align: middle !important;   ">
            <vs-icon class="inline pt-2 mr-4" size="32px" icon="sort"></vs-icon>
           Product Categories
          </h2>
          <vs-button icon="refresh" class="py-0 ml-4" type="flat" @click="fetchCategories()">Refresh</vs-button>
        </div>

      </div>

      <vs-button icon="add"  @click="showCategoryForm()">Add Category</vs-button>
    </div>
    <!-- [end] Categories Filter -->


    <vx-card >


      <!-- Category -->
      <div style="border: 1px solid #e5e5e5" class="px-6 py-6 rounded">
        <div class="flex flex-wrap items-center mb-4">
          <vs-button v-if="this.selectedCategory.id" @click="backToParentCategories()"
            radius class="mr-4" color="danger" icon="keyboard_backspace"></vs-button>

          <h4>
            {{ this.selectedCategory.category_name? this.selectedCategory.category_name+ ` Subcategories `  : "Categories"}}
          </h4>

        </div>


       <vs-table stripe :data="categories">

          <template slot="thead">
            <vs-th>Category Name</vs-th>
            <vs-th>Added at</vs-th>
            <vs-th>Action</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="rowIndex" v-for="(tr, rowIndex) in data">
              <vs-td :data="data[rowIndex].region_name">
                {{data[rowIndex].category_name}}
              </vs-td>
              <vs-td :data="data[rowIndex].created_at">
                {{data[rowIndex].created_at}}
              </vs-td>
              <vs-td :data="data[rowIndex].id">
                <vs-button type="border" color="secondary" class="mr-4" size="small" @click="showSubCategories(data[rowIndex])">Open</vs-button>
                <vs-button type="border"  class="mr-4" size="small" @click="showCategoryForm(data[rowIndex])">Edit</vs-button>
                <vs-button  type="border" color="danger" class="mr-4" size="small" @click="confirmCategoryRemoval(data[rowIndex])">Remove</vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- Category Form -->
      <vs-prompt :title="`Category Name`" :accept-text="`Save`" :cancel-text="`Cancel`"
                 @cancel="categoryInstance={}" color="secondary"
                 @accept="saveCategory()"
                 :active.sync="categoryFormDialog">
        <div  >
          <vs-input placeholder="Category Name"  v-model="categoryInstance.category_name" class="mt-3 w-full"/>
        </div>
      </vs-prompt>
      <!-- [end] Category Form -->
      <!--[end]  Category -->



    </vx-card>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data () {
    return {
      categories: [],
      categoryInstance: { id: null,  category_name : null, parent_category_id : null },
      categoryFormDialog: false,

      selectedCategories: [],
      selectedCategory: {},

    }
  },
  methods: {

    /*** Categories **/
    fetchCategories() {
      axios.get('/resources/products/categories?parent_id='+this.selectedCategory.id).then((response) => {
        this.categories = response.data.payload.categories;
      }).catch((error) => {
        console.log(error)
      })
    },

    showCategoryForm(category){
      this.categoryInstance = category? category : {};
      this.categoryFormDialog = true;
    },

    saveCategory(){
      this.categoryInstance.parent_category_id = this.selectedCategory.id;

      axios.post('/products/category/add', this.categoryInstance)
        .then((response) => {
          this.categoryFormDialog = false;
          this.fetchCategories();
        }).catch((error) => {
        console.log(error)
        })
    },

    confirmCategoryRemoval(category){
      this.categoryInstance = category;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm`,
        text: 'Are you sure you want to remove '+this.categoryInstance.category_name,
        accept: this.removeCategory
      })
    },

    removeCategory(){
      axios.post('/products/category/remove', {
        id: this.categoryInstance.id
      })
        .then((response) => {
          this.fetchCategories();
        }).catch((error) => {
        console.log(error)
        })
    },

    /*** Sub Categories **/
    showSubCategories(category){
      this.selectedCategory = category;
      this.selectedCategories.push(category);
      this.fetchCategories();
    },

    backToParentCategories(){
      this.selectedCategories.pop();
      if(this.selectedCategories.length === 0){
        this.selectedCategory = { };
      }else{
        this.selectedCategory = this.selectedCategories[this.selectedCategories.length-1];
      }
      this.fetchCategories();
    }


  },
  created() {
    this.fetchCategories();
  }
}
</script>
