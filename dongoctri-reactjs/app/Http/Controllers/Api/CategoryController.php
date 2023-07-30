<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;
class CategoryController extends Controller
{
    //
    public function index()
    {
        $categorys = Category::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'categorys' => $categorys],
            200
        );
    }
    public function show($id)
    {
        if(is_numeric($id)){
            $categorys = Category::findOrFail($id);
        }
        else{
            $categorys = Category::where('slug',$id)->first();
        }
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'categorys' => $categorys],
            200
        );
    }
    public function store(Request $request){
        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $category->slug . '.' . $extension;
                $category->image = $filename;
                $files->move(public_path('images/category'),$filename);
            }
        }
        $category->sort_order = $request->sort_order;
        $category->metakey = $request->metakey;
        $category->metadesc = $request->metadesc;
        $category->parent_id = $request->parent_id;
        $category->created_by = 1;
        $category->status = $request->status;
        $category->created_at = date('Y-m-d H:i:s');
        $category->save();
        return response()->json(['success' => true, 'message' => 'Lưu thành công', 'data' => $category],201);
    }
    public function update(Request $request,$id){
        $category = Category::find($id);
        if($category == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $category->slug . '.' . $extension;
                $category->image = $filename;
                $files->move(public_path('images/category'),$filename);
            }
        }
        $category->sort_order = $request->sort_order;
        $category->metakey = $request->metakey;
        $category->metadesc = $request->metadesc;
        $category->parent_id = $request->parent_id;
        $category->created_by = 1;
        $category->status = $request->status;
        $category->created_at = date('Y-m-d H:i:s');
        $category->save();
        return response()->json(['success' => true, 'message' => 'Cập nhật thành công', 'data' => $category],201);
    }
    public function destroy($id){
        $category = Category::find($id);
        if($category==null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $category->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$category],201);
    }
    public function category_list($parent_id = 0)
    {
        $args = [
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $categorys = Category::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'categorys' => $categorys
            ],
            200
        );
    }



}
