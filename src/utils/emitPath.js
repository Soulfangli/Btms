// //所有区域
// var managerArea = {"code":0,"message":"success",
							/**  
							 * "data":[{"id":51451,"areaCode":310000,"areaName":"上海市","parentCode":0,
							 * 				"children":[{"id":51452,"areaCode":310100,"areaName":"上海市","parentCode":310000,
							 * 								"children":[{"id":51453,"areaCode":310101,"areaName":"黄浦区","parentCode":310100,"children":null},{"id":51454,"areaCode":310104,"areaName":"徐汇区","parentCode":310100,"children":null},{"id":51455,"areaCode":310105,"areaName":"长宁区","parentCode":310100,"children":null},{"id":51456,"areaCode":310106,"areaName":"静安区","parentCode":310100,"children":null},{"id":51457,"areaCode":310107,"areaName":"普陀区","parentCode":310100,"children":null},{"id":51458,"areaCode":310109,"areaName":"虹口区","parentCode":310100,"children":null},{"id":51459,"areaCode":310110,"areaName":"杨浦区","parentCode":310100,"children":null},{"id":51460,"areaCode":310112,"areaName":"闵行区","parentCode":310100,"children":null},{"id":51461,"areaCode":310113,"areaName":"宝山区","parentCode":310100,"children":null},{"id":51462,"areaCode":310114,"areaName":"嘉定区","parentCode":310100,"children":null},{"id":51463,"areaCode":310115,"areaName":"浦东新区","parentCode":310100,"children":null},{"id":51464,"areaCode":310116,"areaName":"金山区","parentCode":310100,"children":null},{"id":51465,"areaCode":310117,"areaName":"松江区","parentCode":310100,"children":null},{"id":51466,"areaCode":310118,"areaName":"青浦区","parentCode":310100,"children":null},{"id":51467,"areaCode":310120,"areaName":"奉贤区","parentCode":310100,"children":null},{"id":51468,"areaCode":310151,"areaName":"崇明区","parentCode":310100,"children":null}]}]},{"id":51469,"areaCode":320500,"areaName":"苏州市","parentCode":320000,"children":[{"id":51470,"areaCode":320505,"areaName":"虎丘区","parentCode":320500,"children":null},{"id":51471,"areaCode":320506,"areaName":"吴中区","parentCode":320500,"children":null},{"id":51472,"areaCode":320507,"areaName":"相城区","parentCode":320500,"children":null},{"id":51473,"areaCode":320508,"areaName":"姑苏区","parentCode":320500,"children":null},{"id":51474,"areaCode":320509,"areaName":"吴江区","parentCode":320500,"children":null},{"id":51475,"areaCode":320571,"areaName":"苏州工业园区","parentCode":320500,"children":null},{"id":51476,"areaCode":320581,"areaName":"常熟市","parentCode":320500,"children":null},{"id":51477,"areaCode":320582,"areaName":"张家港市","parentCode":320500,"children":null},{"id":51478,"areaCode":320583,"areaName":"昆山市","parentCode":320500,"children":null},{"id":51479,"areaCode":320585,"areaName":"太仓市","parentCode":320500,"children":null}]}]};

							*/							
// //当前用户请求
// var employeeData = {"code":0,"message":"success","data":{"id":9,"name":"王企鹅","sex":0,"phone":"13866666669","idCard":"320114199003071672","departmentId":40,"departmentName":"111","positionId":16,"positionName":"职位11","roleId":70,"isPosition":1,"status":1,"statusText":"启用","memberId":4055,"memberDepartmentId":14,"companyId":36662,"isAdmin":0,"isAdminText":"否","createdTime":"2021-08-13 17:16:55","lastLoginTime":null,"createdId":3771,"createdName":"大方哥",
// 											"areas":[{"id":51451,"areaCode":310000,"areaName":"上海市","parentCode":0},{"id":51452,"areaCode":310100,"areaName":"上海市","parentCode":310000},{"id":51469,"areaCode":320500,"areaName":"苏州市","parentCode":320000},
// 											{"id":51496,"areaCode":310104,"areaName":"徐汇区","parentCode":310100},{"id":51497,"areaCode":310105,"areaName":"长宁区","parentCode":310100},{"id":51498,"areaCode":320505,"areaName":"虎丘区","parentCode":320500},{"id":51499,"areaCode":320506,"areaName":"吴中区","parentCode":320500}],
// 											"areasText":"徐汇区,长宁区,虎丘区,吴中区"}};
// //当前用户区域
// var employeeAreas = employeeData.data.areas;//[{"id":51451,"areaCode":310000,"areaName":"上海市","parentCode":0},{"id":51452,"areaCode":310100,"areaName":"上海市","parentCode":310000},{"id":51469,"areaCode":320500,"areaName":"苏州市","parentCode":320000},{"id":51496,"areaCode":310104,"areaName":"徐汇区","parentCode":310100},{"id":51497,"areaCode":310105,"areaName":"长宁区","parentCode":310100},{"id":51498,"areaCode":320505,"areaName":"虎丘区","parentCode":320500},{"id":51499,"areaCode":320506,"areaName":"吴中区","parentCode":320500}]
// //主函数入口
// var employeeAreaArrays = handleAreasData(employeeAreas);
// console.log(employeeAreaArrays);
/**
 *平铺数组结构转二维数组区域结构
 * 参数：[{"id":51451,"areaCode":310000,"areaName":"上海市","parentCode":0},{"id":51452,"areaCode":310100,"areaName":"上海市","parentCode":310000},{"id":51469,"areaCode":320500,"areaName":"苏州市","parentCode":320000},{"id":51496,"areaCode":310104,"areaName":"徐汇区","parentCode":310100},{"id":51497,"areaCode":310105,"areaName":"长宁区","parentCode":310100},{"id":51498,"areaCode":320505,"areaName":"虎丘区","parentCode":320500},{"id":51499,"areaCode":320506,"areaName":"吴中区","parentCode":320500}]
 * 结果：[[310000,310100,310104],[310000,310100,310105],[320500,320505],[320500,320506]]
 */

export function handleAreasData(employeeAreas) {
  //初始化区域map
  var employeeAreasMap = new Map();
  for (var i = 0; i < employeeAreas.length; i++) {
    var area = employeeAreas[i];
    var areaCode = area.areaCode;
    employeeAreasMap.set(areaCode, area);
  }
  //转成树
  var employeeAreasTree = getMemberAreaDtoTree(employeeAreasMap, employeeAreas);
  var result = [];
  handleTree(employeeAreasMap, employeeAreasTree, result);
  return result;
}
/**
 * 处理树
 *
 */
function handleTree(employeeAreasMap, areasTree, result) {
  areasTree.forEach(function (item) {
    var children = item.children;
    if (children) {
      handleTree(employeeAreasMap, children, result);
    } else { //叶子节点
      var parentCodes = getParentCodes(employeeAreasMap, item);
      parentCodes.push(item.areaCode)
      result.push(parentCodes)
    }
  })

}
/**获取所有的父级*/
function getParentCodes(areaMap, area) {
  var parentCodes = [];
  if (!area.parentCode) {
    return parentCodes;
  }
  var manageAreaDto = areaMap.get(area.parentCode);
  var i = 0;
  while (manageAreaDto) {
    parentCodes.unshift(manageAreaDto.areaCode);
    var parentCode = manageAreaDto.parentCode;
    if (!parentCode) {
      return parentCodes;
    }
    manageAreaDto = areaMap.get(parentCode);
    //控制查询父级的深度
    if (i < 30) {
      i++;
    } else {
      break;
    }
  }
  return parentCodes;
}
/**
 * 将区域List转换为类目树结构
 *
 * @param areaList
 * @return
 */
function getMemberAreaDtoTree(memberAreaMap, areaList) {
  var memberAreaTree = [];
  //遍历结果集
  areaList.forEach(function (item) {
    //在hash中取出key为单条记录中code的值
    var parentCode = item.parentCode;
    var hashMemberArea = memberAreaMap.get(parentCode);
    //如果记录的pcode存在，则说明它有父节点，将她添加到孩子节点的集合中
    if (hashMemberArea) {
      //检查是否有child属性
      if (hashMemberArea.children) {
        var ch = hashMemberArea.children;
        ch.push(item);
      } else {
        var ch = [];
        ch.push(item);
        hashMemberArea['children'] = ch;
      }
    } else {
      memberAreaTree.push(item);
    }
  });
  return memberAreaTree;
}
