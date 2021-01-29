<template>
  <div class="data-table">
    <a-button
        class="editable-add-btn"
        @click="setCreateDrawerVisibility(true)">
      Create
    </a-button>
    <a-table bordered :data-source="tableData" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell
            text="Edit"
            @change="onCellChange(record.key, 'name', $event)">
        </editable-cell>
        <deletable-cell
            text="Delete"
            @change="onCellChange(record.key, 'name', $event)">
        </deletable-cell>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
        placement="right"
        :visible="createDrawerVisibility"
        title="Create"
        :width="400"
        @close="setCreateDrawerVisibility(false)">
        <a-form
            :form="form"
            layout="vertical"
            hide-required-mark>
            <a-row :gutter="16">
              <a-col :span="16">
                <a-form-item label="Name">
                  <a-input
                      v-decorator="[
                      'name',
                      {
                        rules: [{ required: true, max_line_len: 20, message: 'Please enter title' }],
                      },
                    ]"
                      placeholder="Please enter title"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          <a-row :gutter="15">
            <a-col :span="12">
              <a-form-item label="Status">
                <a-input
                    v-decorator="[
                    {
                      rules: [{ required: true, message: 'Please status' }],
                    },
                  ]"
                    placeholder="Please enter Status"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
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
  </div>
</template>

<script>
    import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
    import EditableCell from '@/components/EditableCell';
    import DeletableCell from '@/components/DeletableCell';

    export default {
        components: {
          DeletableCell,
          EditableCell
        },

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
                }
              ],
              createDrawerVisibility: false,
              form: this.$form.createForm(this),
              newTitle: '',
              newStatus: ''
            };
        },

      computed: {
        ...mapState([
          'tableData'
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
            'addNewData'
        ]),

        /**
         * @param {boolean} value
         */
        setCreateDrawerVisibility (value) {
          this.createDrawerVisibility = value;
          this.resetInputValues();
        },

        resetInputValues () {
          this.newStatus = '';
          this.newTitle = '';
        },

        addNewData () {
          this.addNewData({
            title: this.newTitle,
            status: this.newStatus,
            id: this.getMaximumID + 1
          })
        }
      }
    }
</script>

<style scoped>
  .data-table {
    max-width: 80vw;
    margin: 0 auto;
  }
</style>
