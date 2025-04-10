import prisma from "../lib/prisma.js";

export const getPosts = async( req,res) =>
{
    try{
        const posts = await prisma.post.findMany();
        console.log(posts)
        res.status(200).json(posts);
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to get posts"})
    }
}

export const getPost = async( req,res) =>
{
    const id = req.params.id;
    try{
        const post = prisma.post.findUnique({
            where:{id}
        })
        res.status(200).json(post)

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to get post"})
    }
}

export const addPost = async( req,res) =>
{
    const body = req.body;
    //need userId
    const tokenUserId = req.userId;
   
    try{
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId : tokenUserId,
                postDetail:{
                    create:body.postDetail
                }
            },
        });
        res.status(200).json(newPost);
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to update post"})
    }
}

export const updatePost = async( req,res) =>
{
    try{

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to update post"})
    }
}

export const deletePost = async( req,res) =>
{
    const id = req.params.id;
    const tokenUserId = req.userId;
    try{
        const post = await prisma.post.findUnique({
            where:{id}
        })
        if(post.userId!==tokenUserId)
        {
            return res.status(403).json({message:"Not authorized to delete post"})
        }
        await prisma.post.delete({
            where:{id}
        })
        res.status(200).json({message:"Post Deleted"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to delete post"})
    }
}