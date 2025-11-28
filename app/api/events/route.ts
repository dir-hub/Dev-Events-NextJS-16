import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import {v2 as cloudinary} from 'cloudinary'


export async function POST(req:NextRequest){
    try {
       await connectDB();
       
       const  formData = await  req.formData();

       let event;

       try {
           event = Object.fromEntries(formData.entries());
       }catch (e){
           return NextResponse.json({message:'Invalid JSON data format'}, {status:400})
       }

       const file = formData.get('image') as File | null;
       if(!file){
           return NextResponse.json({message:'Image is required'}, {status:400})
       }

       let tags = JSON.parse(formData.get('tags') as string);
        let agenda = JSON.parse(formData.get('agenda') as string);

       const arrayBuffer = await file.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       
       const uploadResult = await new Promise((resolve, reject) => {
           const stream = cloudinary.uploader.upload_stream(
               { resource_type: 'image', folder: 'DevEvents' },
               (error, result) => {
                   if (error) {
                       return reject(error);
                   }
                   resolve(result);
               }
           );

           // write buffer to the upload stream
           stream.end(buffer);
       });

    const uploadRes: any = uploadResult;
    // Cloudinary may return `secure_url` or `url` depending on config
    event.image = uploadRes?.secure_url || uploadRes?.url || '';

     const createdEvent = await Event.create({
         ...event,
         tags: tags,
         agenda: agenda,
     });



       return NextResponse.json({message:'Event Created Successfully', event:createdEvent},{status:201})
    }catch (e){
        console.error(e);
        return NextResponse.json({message:'Event Creation Failed', error: e instanceof Error ? e.message:'Unknown'},{status:500})
    }
}

export async function GET(req:NextRequest){
    try {
        await connectDB();
        const events = await Event.find().sort({createdAt:-1});
        return NextResponse.json({message:'Events Fetched Successfully', events},{status:200})
    }catch (e){

        return NextResponse.json({message:'Event Fetching Failed'},{status:500})
    }
}

