<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Str;
class SliderController extends Controller
{
    //
    public function index()
    {
        $sliders = Slider::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'sliders' => $sliders],
            200
        );
    }
    public function slider_list($position)
    {
        $args = [
            ['position', '=', $position],
            ['status', '=', 1]
        ];
        $sliders = Slider::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'sliders' => $sliders
            ],
            200
        );
    }
    public function show($id)
    {
        $sliders = Slider::find($id);
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'sliders' => $sliders],
            200
        );
    }
    public function update(Request $request,$id){
        $slider = Slider::find($id);
        if($slider == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $slider->name = $request->name;
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $slider->name . '.' . $extension;
                $slider->image = $filename;
                $files->move(public_path('images/slider'), $filename);
            }
        }
        $slider->sort_order = $request->sort_order;
        $slider->position = $request->position;
        $slider->created_by = 1;
        $slider->status = $request->status;
        $slider->created_at = date('Y-m-d H:i:s');
        $slider->save();
        return response()->json(['success' => true, 'message' => 'Thêm thành công', 'data' => $slider],201);
    }
    public function store(Request $request){
        $slider = new Slider();
        $slider->name = $request->name;
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $slider->name . '.' . $extension;
                $slider->image = $filename;
                $files->move(public_path('images/slider'),$filename);
            }
        }
        $slider->sort_order = $request->sort_order;
        $slider->position = $request->position;
        $slider->created_by = 1;
        $slider->status = $request->status;
        $slider->created_at = date('Y-m-d H:i:s');
        $slider->save();
        return response()->json(['success' => true, 'message' => 'Thêm thành công', 'data' => $slider],201);
    }
    public function destroy($id){
        $slider = Slider::find($id);
        if($slider == null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $slider->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$slider],201);
    }

}
