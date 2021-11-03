 //posts
 let popup_post
 const drow_posts_list = () => {
     
     let dom = document.querySelector(".existing-itmes")
     dom.innerHTML = ''
     
     // document.querySelector("#posts-list-aggregated .pop-header span").innerHTML = filtered_data.posts.length + '/' + global_data.posts.length

     filtered_data.posts.forEach((post, index) => {
         // posts = filtered_data.posts.filter(post => post.channel == channel.title)
         let row = document.createElement('tr')
         row.className = 'item'
         row.setAttribute('data-index', index)
         dom.appendChild(row)
         channel = global_data.channels.filter(channel => channel.title == post.channel)[0]
         
         row.onclick = (e) => {
             popup_post = filtered_data.posts[e.currentTarget.getAttribute("data-index")]
             show_post_pop()
         }
         // <div class="item-logo"><img class="profile-picture" src="` + channel.img + `" /><i class="fab fa-` + channel.platform + `"></i></div>
{/* <i class="fas fa-play-circle"></i> */}
         row.innerHTML = `
             <td>` + post["Post Created Date"] + `</td>
             <td>
                 <div class="item-logo"><i class="fab fa-` + channel.platform + `"></i></div>
                 <div class="item-name">` + channel.title + `</div>
             </td>
             <td>` + (( Math.floor(Math.random() * 5) + 1) > 3 ? '<i class="fas fa-play-circle"></i>' : '') + (post.Message || post["Link Text"]) + `</td>
             <td class="tags">` + post.topics.map(a => '<div>' + a + '</div>') + `
             ` + post.persons_mentioned.map(a => '<div>' + a + '</div>') + `
             ` + post.persons_appeared.map(a => '<div>' + a + '</div>') + `
             ` + post.symbols.map(a => '<div>' + a + '</div>') + `</td>
             <td>` + Math.floor(post.Likes * 1.6) + `</td>
             <td>` + post.Likes + `</td>
             <td>` + post.hate_speech + `</td>
             <td>` + post.hate_speech + `</td>
             <td>` + post.hate_speech + `</td>`
     })
 }


//  let popup_post
 const drow_sources = () => {
     
     let dom = document.querySelector(".existing-itmes")
     dom.innerHTML = ''
     
     // document.querySelector("#posts-list-aggregated .pop-header span").innerHTML = filtered_data.posts.length + '/' + global_data.posts.length

     data_sources.forEach((channel, index) => {
         // posts = filtered_data.posts.filter(post => post.channel == channel.title)
         let row = document.createElement('tr')
         row.className = 'item'
         row.setAttribute('data-index', index)
         dom.appendChild(row)
        //  channel = global_data.channels.filter(channel => channel.title == post.channel)[0]
         
         row.onclick = (e) => {
            //  popup_post = filtered_data.posts[e.currentTarget.getAttribute("data-index")]
            //  show_post_pop()
         }
         
//          platform: "tv_georgia"
// ​
// platform_id: "2f3d7540-a822-11e7-8581-67c578e4c42e"
// ​
// program_title: "ოჯახის ექიმი"
// ​
// tags: Array []
// ​
// title: "პირველი TV"
// ​
// url: "ht
        //  row.innerHTML = `
        //      <td>` + post["Post Created Date"] + `</td>
        //  console.log(channel.tags)
        channel.tags = channel.tags ? JSON.parse('{"d":' + "['mini-set']".replaceAll("'", '"') + "}").d : []
        innerHTML = `
             <td>
                 <div class="item-logo"><i class="` + (channel.platform == 'tv_georgia' ? 'fas' : 'fab') + ` fa-` + channel.platform + `"></i></div>
             </td>
             <td>` + ((channel.program_title ? channel.program_title + ' - ' : '') +channel.title) + `</td>
             <td class="tags">` + channel.tags.map(a => '<div>' + a + '</div>') + "</td>"
        
        // innerHTML += '<td>' + Math.floor(Math.random() * 1200) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 1200) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 150) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 7000) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 1200) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 800) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 400) + '</td>'
        innerHTML += '<td>' + Math.floor(Math.random() * 100) + '</td>'
        

        row.innerHTML = innerHTML
            //  + `
            //  <td>` + Math.floor(channel.Likes * 1.6) + `</td>
            //  <td>` + channel.Likes + `</td>
            //  <td>` + channel.hate_speech + `</td>
            //  <td>` + channel.hate_speech + `</td>
            //  <td>` + channel.hate_speech + `</td>`
     })
 }