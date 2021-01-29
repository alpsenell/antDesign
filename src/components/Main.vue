<template>
  <div class="data-table">
    <div class="data-table-utils">
      <span class="data-table-title">Tittle</span>
      <a-button
          class="editable-add-btn create-data-button"
          @click="setCreateDrawerVisibility(true)">
        Create
      </a-button>
    </div>
    <a-table bordered :data-source="tableData" :columns="columns">
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, data">
        <a @click="editData(data)"> Edit </a>
        <a-divider type="vertical" />
        <a-popconfirm
            title="Are you sure delete this data?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteData(data)">
        <a href="#">Delete</a>
        </a-popconfirm>
      </span>
    </a-table>
    <a-drawer
        placement="right"
        :visible="createDrawerVisibility"
        title="Create"
        :width="400"
        @close="setCreateDrawerVisibility(false)">
      <a-input-group size="large">
        <a-input
            id="title"
            v-model="newTitle"
            placeholder="Enter new Title">
        </a-input>
      </a-input-group>
      <a-input-group size="large">
        <a-input
            id="status"
            v-model="newStatus"
            placeholder="Enter new Status">
        </a-input>
      </a-input-group>
      <div
            :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="setCreateDrawerVisibility(false)">
            Cancel
          </a-button>
          <a-button type="primary" @click="addNewData">
            Submit
          </a-button>
        </div>
    </a-drawer>
    <a-drawer placement="right"
              :visible="editDrawerVisibility"
              title="Create"
              :width="400"
              @close="closeEditDrawer">
      <a-input-group size="large">
        <a-input
            id="editTitle"
            v-model="edittedTitle"
            placeholder="Enter new Title">
        </a-input>
      </a-input-group>
      <a-input-group size="large">
        <a-input
            id="editStatus"
            v-model="edittedStatus"
            placeholder="Enter new Status">
        </a-input>
      </a-input-group>
      <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="closeEditDrawer">
          Cancel
        </a-button>
        <a-button type="primary" @click="editActiveData">
          Submit
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
    import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
    export default {
      beforeMount() {
        this.fetchData();
      },

      data () {
            return {
              columns: [
                {
                  title: 'ID',
                  dataIndex: 'id',
                  key: 'id'
                },
                {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title'
                },
                {
                  title: 'Status',
                  key: 'tags',
                  dataIndex: 'status',
                  scopedSlots: { customRender: 'tags' }
                },
                {
                  title: 'Action',
                  key: 'action',
                  scopedSlots: { customRender: 'action' },
                }
              ],
              createDrawerVisibility: false,
              editDrawerVisibility: false,
              form: this.$form.createForm(this),
              newTitle: '',
              newStatus: '',
              edittedTitle: '',
              edittedStatus: ''
            };
        },

      watch: {
        activeTableData: {
          deep: true,
          handler () {
            this.edittedTitle = this.activeTableData.title;
            this.edittedStatus = this.activeTableData.status;
          }
        }
      },

      computed: {
        ...mapState([
          'tableData',
          'activeTableData'
        ]),

        ...mapGetters([
            'getMaximumID'
        ])
      },

      methods: {
        ...mapActions([
          'fetchData'
        ]),

        ...mapMutations([
            'addNewDataToState',
            'removeDataFromState',
            'setActiveData',
            'editActiveDataFromState',
            'resetActiveData'
        ]),

        /**
         * @param {boolean} value
         */
        setCreateDrawerVisibility (value) {
          this.createDrawerVisibility = value;
          this.resetInputValues();
        },

        /**
         * @param {boolean} value
         */
        setEditDrawerVisibility (value) {
          this.editDrawerVisibility = value;
        },
        
        closeEditDrawer () {
          this.setEditDrawerVisibility(false);
          this.resetActiveData();
        },

        resetInputValues () {
          this.newStatus = '';
          this.newTitle = '';
        },

        addNewData () {
          this.addNewDataToState({
            title: this.newTitle,
            status: this.newStatus,
            id: this.getMaximumID + 1
          });
          this.setCreateDrawerVisibility(false);

          this.$message.success('Successfully Created');
        },

        /**
         * @param {number} idToFind
         */
        findRelatedDataIndex (idToFind) {
          const selectedData = this.tableData.find(data => data.id === idToFind);

          return this.tableData.indexOf(selectedData);
        },

        /**
         * @param {number} id
         */
        editData ({ id }) {
          this.setActiveData(
              this.findRelatedDataIndex(id)
          );

          this.setEditDrawerVisibility(true);
        },

        /**
         * @param {number} id
         */
        deleteData ({ id }) {
          this.removeDataFromState(
              this.findRelatedDataIndex(id)
          );

          this.$message.success('Successfully Deleted');
        },

        editActiveData () {
          this.editActiveDataFromState({
            title: this.edittedTitle,
            status: this.edittedStatus
          });

          this.edittedTitle = '';
          this.edittedStatus = '';
          this.closeEditDrawer();

          this.$message.success('Successfully Edited');
        }
      }
    }
</script>

<style scoped>
  .data-table {
    max-width: 80vw;
    margin: 0 auto;
  }

  .data-table-utils {
    height: 60px;
  }

  .create-data-button {
    float: right;
    margin: 10px 0;
  }

  .data-table-title {
    float: left;
    margin: 10px 0;
  }
</style>
