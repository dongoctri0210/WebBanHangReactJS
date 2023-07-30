<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderBy('created_at','DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'posts' => $posts],
            200
        );
    }
    public function show($id)
    {
        $posts = Post::find($id);
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'posts' => $posts],
            200
        );
    }
    public function post_all($limit, $page = 1)
    {
        $offset = ($page - 1) * $limit;
        $posts = Post::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->offset($offset)
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );           
    }
    public function update(Request $request,$id){
        $post = Post::find($id);
        if($post == null ){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công',
             'data' => null],201);
        }
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;      
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $post->slug . '.' . $extension;
                $post->image = $filename;
                $files->move(public_path('images/post'),$filename);
            }
        }
        $post->type = $request->type;
        $post->metakey = $request->metakey;
        $post->metadesc = $request->metadesc;
        $post->created_by = 1;
        $post->status = $request->status;
        $post->created_at = date('Y-m-d H:i:s');
        $post->save();
        return response()->json(['success' => true, 'message' => 'Cập nhật thành công', 'data' => $post],201);
    }
    public function store(Request $request){
        $post = new Post();
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;      
        $files = $request->image;
        if($files != null){
            $extension = $files->getClientOriginalExtension();
            if(in_array($extension,['jpg','png','gif','webp','jpeg'])){
                $filename = $post->slug . '.' . $extension;
                $post->image = $filename;
                $files->move(public_path('images/post'),$filename);
            }
        }
        $post->type = $request->type;
        $post->metakey = $request->metakey;
        $post->metadesc = $request->metadesc;
        $post->created_by = 1;
        $post->status = $request->status;
        $post->created_at = date('Y-m-d H:i:s');
        $post->save();
        return response()->json(['success' => true, 'message' => 'Thêm thành công', 'data' => $post],201);
    }
    public function destroy($id){
        $post = Post::find($id);
        if($post == null){
            return response()->json(['success' => false, 'message' => 'Tải dữ liệu không thành công', 'id' =>null],201);
        }
        $post->delete();
        return response()->json(['success' => true, 'message' => 'Xóa thành công', 'id' =>$post],201);
    }
    function post_list($type, $limit)
    {
        $args = [
            ['type', '=', $type],
            ['status', '=', 1]
        ];
        $posts = Post::where($args)
            ->orderBy('created_at', 'DESC')
            > limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'posts' => $posts
            ],
            200
        );
    }
    public function post_detail($slug){
        $post = Post::where([['slug','=',$slug],['status','=',1]])->first();
        if($post == null){
            return response()->json(
            [
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'posts' => null
            ],
            404
        );
        }  
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'post' => $post
            ],
            200
        );
    }

}
