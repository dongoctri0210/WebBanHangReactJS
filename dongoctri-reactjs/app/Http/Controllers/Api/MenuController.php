<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Menu;
class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'menus' => $menus],
            200
        );
    }
    public function show($id)
    {
        $menus = Menu::find($id);
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'menus' => $menus],
            200
        );
    }
    public function store(Request $request){
        $menu = new Menu();
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->table_id = $request->table_id;
        $menu->parent_id = $request->parent_id;
        $menu->type = $request->type;
        $menu->position = $request->position;
        $menu->level = $request->level;
        $menu->sort_order = $request->sort_order;
        $menu->created_by = 1;
        $menu->status = $request->status;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->save();
        return response()->json(['success' => true, 'message' => 'Lưu thành công', 'data' => $menu],201);
    }
    public function update(Request $request,$id){
        $menu = Menu::find($id);
        if($menu == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->table_id = $request->table_id;
        $menu->parent_id = $request->parent_id;
        $menu->type = $request->type;
        $menu->position = $request->position;
        $menu->level = $request->level;
        $menu->sort_order = $request->sort_order;
        $menu->created_by = 1;
        $menu->status = $request->status;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->save();
        return response()->json(['success' => true, 'message' => 'Cập nhật thành công', 'data' => $menu],201);
    }
    public function destroy($id){
        $menu = Menu::find($id);
        if($menu==null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $menu->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$menu],201);
    }
    public function menu_list($position, $parent_id = 0)
    {
        $args = [
            ['position', '=', $position],
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $menus = Menu::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        if(count($menus)){
            return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'menus' => $menus
            ],
            200
        );
        }
        else{
            return response()->json(
            [
                'success' => false,
                'message' => 'Không có dữ liệu',
                'menus' => null
            ],
            200
        );
        }
        
    }


}
