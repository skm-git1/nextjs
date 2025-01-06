import fs from 'fs';
import matter from 'gray-matter'

export default function getPostMetadata(basePath){
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markDownPosts = files.filter(file => file.endsWith('.md'))

    // get the file data
    const posts = markDownPosts.map((fileName)=>{
        const fileContents = fs.readFileSync(`${basePath}/${fileName}`, "utf8")
        const matterResult = matter(fileContents);
        return{
            title: matterResult.data.title,
            prep_time: matterResult.data.prep_time,
            cook_time: matterResult.data.cook_time,
            bio: matterResult.data.description,
            slug: fileName.replace('.md', '')
        }
    })
    return posts;
}

