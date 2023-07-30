<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    //
    public function index()
    {
        $users = User::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'users' => $users],
            200
        );
    }
    public function show($id)
    {
        $users = User::find($id);
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'users' => $users],
            200
        );
    }
    public function store(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->address = $request->address;     
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $user->name . '.' . $extension;
                $user->image = $filename;
                $files->move(public_path('images/user'),$filename);
            }
        }
        $user->roles = $request->roles;
        $user->created_by = 1;
        $user->status = $request->status;
        $user->created_at = date('Y-m-d H:i:s');
        $user->save();
        return response()->json(['success' => true, 'message' => 'Thêm thành công', 'data' => $user],201);
    }
    public function update(Request $request,$id){
        $user = User::find($id);
        if($user == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->address = $request->address;     
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $user->name . '.' . $extension;
                $user->image = $filename;
                $files->move(public_path('images/user'),$filename);
            }
        }
        $user->roles = $request->roles;
        $user->created_by = 1;
        $user->status = $request->status;
        $user->created_at = date('Y-m-d H:i:s');
        $user->save();
        return response()->json(['success' => true, 'message' => 'Lưu thành công', 'data' => $user],201);
    }
    public function destroy($id){
        $user = User::find($id);
        if($user==null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $user->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$user],201);
    }
}
