<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
class ContactController extends Controller
{
    //
    public function index()
    {
        $contacts = Contact::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'contacts' => $contacts],
            200
        );
    }
    public function show($id)
    {
        $contacts = Contact::find($id);
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'contacts' => $contacts],
            200
        );
    }
    public function store(Request $request){
        $contact = new Contact();
        $contact->user_id = $request->user_id;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->replay_id = $request->replay_id;
        $contact->created_by = 1;
        $contact->status = $request->status;
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->save();
        return response()->json(['success' => true, 'message' => 'Lưu thành công', 'data' => $contact],201);
    }
    public function update(Request $request,$id){
        $contact = Contact::find($id);
        if($contact == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $contact->user_id = $request->user_id;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->replay_id = $request->replay_id;
        $contact->created_by = 1;
        $contact->status = $request->status;
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->save();
        return response()->json(['success' => true, 'message' => 'Cập nhật thành công', 'data' => $contact],201);
    }
    public function destroy($id){
        $contact = Contact::find($id);
        if($contact==null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $contact->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$contact],201);
    }
}
