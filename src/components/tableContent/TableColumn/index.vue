<template>
  <div class="containner">
    <template v-for="(item, index) in propDatas">
      <el-table-column
        :key="'option-header-inner-' + index"
        v-if="!item.hidden"
        :prop="item.prop"
        :label="item.label"
        :width="item.colWidth"
        :min-width="item.width"
        :fixed="item.fixed"
        show-overflow-tooltip
        :align="item.align"
      >
        <template slot-scope="scope">
          <span v-if="item.type === 'income'">{{
            scope.row[item.prop] | fliterIn
          }}</span>
          <el-checkbox
            v-else-if="item.type === 'checkbox'"
            v-model="scope.row[item.prop]"
            disabled
          />
          <el-input
            v-else-if="item.type === 'input'"
            v-model="scope.row[item.prop]"
            placeholder=""
            size="small"
            clearable
          ></el-input>
          <span v-else-if="item.type === 'date'">{{
            scope.row[item.prop] | fromatDate
          }}</span>
          <el-button
            v-else-if="item.type === 'button'"
            :type="item.btnType"
            size="small"
            @click="tablecolumnClick(scope.row, item, index)"
            >{{
              item.btnLabel ? item.btnLabel : scope.row[item.prop]
            }}</el-button
          >
          <el-rate
            v-else-if="item.type === 'rate'"
            v-model="scope.row[item.prop]"
            :disabled="item.disabled"
            :max="item.max"
            :allow-half="item.allowhalf"
            :id="item.iconSize ? 'col-rate' : ''"
          ></el-rate>
          <el-image
            v-else-if="item.type === 'img' && scope.row[item.prop]"
            style="width: 60px; height: 60px; cursor: pointer"
            fit="contain"
            :src="scope.row[item.prop]"
            :preview-src-list="
              scope.row['list'] ? scope.row['list'] : [scope.row[item.prop]]
            "
          >
          </el-image>
          <el-progress
            v-else-if="item.type === 'progress'"
            :color="item.color"
            :text-inside="true"
            :stroke-width="22"
            :percentage="scope.row[item.prop] || 0"
            status="warning"
          ></el-progress>
          <!-- 多行展示并有点击事件 -->
          <div v-else-if="item.showMany">
            <div
              v-for="(it, idx) in scope.row[item.prop]"
              :key="idx + 'showMany'"
            >
              <el-button
                type="text"
                :style="`color: ${item.color};`"
                @click="tablecolumnClick(scope.row[item.prop], it, idx)"
                >{{ it }}</el-button
              >
            </div>
          </div>
          <el-button
            v-else-if="item.type === 'color-span'"
            type="text"
            :style="`color: ${item.color};`"
            @click="tablecolumnClick(scope.row, item, index)"
            >{{ scope.row[item.prop] }}</el-button
          >
          <span
            v-else-if="
              item.hiddenClo &&
              item.hiddenClo.value.includes(scope.row[item.hiddenClo.key])
            "
          ></span>
          <el-button
            v-else-if="item.type === 'button-color'"
            :type="item.btnType"
            :disabled="
              !item.changeColorExists.existsValue.includes(
                scope.row[item.changeColorExists.existsKey] + ''
              )
            "
            @click="tablecolumnClick(scope.row, item, index)"
            :style="{
              color: changeColor2(
                scope.row[item.changeColorExists.existsKey] + '',
                item.changeColorExists
              ),
            }"
          >
            {{ scope.row[item.prop] }}
          </el-button>
          <div v-else-if="item.type === 'input-edit'">
            <span
              v-if="!scope.row[item.isEdit.key]"
              :style="{
                color: changeColor2(
                  scope.row[item.changeColorExists.existsKey] + '',
                  item.changeColorExists
                ),
              }"
              >{{ scope.row[item.prop] }}</span
            >
            <el-input
              v-if="scope.row[item.isEdit.key]"
              v-model="scope.row[item.prop]"
              size="small"
              style="width: 100px"
            ></el-input>
            <i
              class="el-icon-edit showicon"
              @click="tablecolumnClick(scope.row, item, index)"
              v-if="!scope.row[item.isEdit.key]"
            ></i>
            <i
              class="el-icon-check showicon"
              @click="tablecolumnClick(scope.row, item, index)"
              v-if="scope.row[item.isEdit.key]"
            ></i>
          </div>
          <span
            v-else-if="item.type === 'span-color'"
            :style="{
              color: changeColor2(
                scope.row[item.changeColorExists.existsKey] + '',
                item.changeColorExists
              ),
            }"
          >
            {{ scope.row[item.prop] }}
          </span>
          <span v-else-if="item.type === 'span-Static'">
            {{ item.staticText }}
          </span>
          <span
            v-else
            :style="{
              color: changeColor(scope.row[item.prop], item.changeColor),
            }"
          >
            {{ scope.row[item.prop] }}
          </span>
        </template>
      </el-table-column>
    </template>
  </div>
</template>

<script>
import helper from "@/utils/helper";
export default {
  name: "TableColumn",
  props: ["propDatas"],
  data() {
    return {};
  },
  filters: {
    fromatDate(date) {
      return helper.fromatDate_y_m_d(date);
    },
    fliterIn(value) {
      return helper.filterIncome(value);
    },
  },
  methods: {
    /**
     * 根据不同字段值显示不同颜色
     */
    changeColor(value, colorObj) {
      let defaultColor = "#262626";
      if (!colorObj || colorObj.length === 0) return defaultColor;
      if (Object.prototype.toString.call(colorObj) === "[object Object]") {
        if (colorObj.value === value && colorObj.color)
          defaultColor = colorObj.color;
        if (!colorObj.value && colorObj.color) defaultColor = colorObj.color;
      }
      if (Object.prototype.toString.call(colorObj) === "[object Array]") {
        colorObj.forEach((item) => {
          if (item.value === value && item.color)
            defaultColor = item.color || "#262626";
        });
      }
      return defaultColor;
    },
    // 根据是否改变颜色的判断属性名，应该改变颜色时的满足条件的可能值，改变为目标颜色
    changeColor2(scopeValue, existsObj) {
      let defaultColor = "#262626";
      if (!existsObj || !existsObj.existsValue || !existsObj.color)
        return defaultColor;
      if (
        scopeValue == existsObj.existsValue ||
        existsObj.existsValue.includes(scopeValue)
      ) {
        defaultColor = existsObj.color;
      }
      return defaultColor;
    },
    /**
     * 表格中行内的操作table-column
     */
    tablecolumnClick(row, btn, index) {
      // row.index = index
      // 不要用下标临时删除等操作了，不安全！传数据的时候统一手动给一个属性 mykey: xxx
      // this.$parent.tablecolumnClick(row, btn)
      this.$emit("tablecolumnClick", row, btn, index);
    },
  },
};
</script>

<style lang="scss">
#col-rate .el-rate__icon {
  font-size: 16px;
}
.showicon {
  display: none;
}
.el-table__body tr:hover {
  .showicon {
    display: inline;
    color: #ff813b;
  }
}
.el-tooltip__popper {
  max-width: 25%;
  line-height: 1.5;
}
</style>