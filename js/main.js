  //api
        // http://.ngrok.io 51cca18aac85.ngrok.io
        url = 'https://7324b19c5ca8.ngrok.io'

        //utils
        const debounce = (callback, wait) => {
            let timeoutId = null;
            return (...args) => {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    callback.apply(null, args);
                }, wait);
            };
        }
        // dashboardblocks
        // document.getElementById("add-a-channel-btn").onclick = () => document.getElementById("add-a-channel-pop").style.display = "block"
        // document.querySelector("#add-a-channel-pop .close").onclick = () => document.getElementById("add-a-channel-pop").style.display = "none"
        // document.querySelector("#post-details .close").onclick = () => document.getElementById("post-details").style.display = "none"


        //toggle filters
        // document.getElementById("toggle-filters").onclick = () => {
        //     document.body.classList.toggle("hide-menu")
        // }

        //filters header
        var curt 
        filter_headers = [...document.querySelectorAll(".filter-header")]
        filter_headers.forEach(element => {
            
            element.onclick = (e) => {
                if([...e.currentTarget.classList].includes("filter-header")){
                    filter_headers.forEach(element => element.parentNode.classList.remove('active'))
                    e.currentTarget.parentNode.classList.add('active')
                }
            }
        });

        //pop header
        pop_headers = [...document.querySelectorAll(".dashboard-block .pop-header")]
        pop_headers.forEach(element => {
            // element.onclick = (e) => {
            //     e.currentTarget.parentNode.classList.toggle('active')
            // }
            element.onclick = (e) => {
                e.currentTarget.parentNode.classList.toggle('active')
                if (e.currentTarget.parentNode.classList.contains('active')){

                    // e.currentTarget.parentNode.style.height = e.currentTarget.parentNode.style.height = 'calc(125vh - 130px)'
                    document.getElementById('dashboard').scrollTop = e.currentTarget.parentNode.offsetTop - 15
                } else {
                    e.currentTarget.parentNode.style.height = ''
                }
            }
        });

        
        // drow left-bar dom

        const toggleTheFilterItem = (e) => {
            if ([...e.currentTarget.classList].includes('active')){
                e.currentTarget.classList.remove('active')
                index = global_filters[e.currentTarget.getAttribute('data-filter')].indexOf(e.currentTarget.getAttribute('data-id'))
                global_filters[e.currentTarget.getAttribute('data-filter')].splice(index, 1)
            } else {
                global_filters[e.currentTarget.getAttribute('data-filter')].push(e.currentTarget.getAttribute('data-id'))
                e.currentTarget.classList.add('active')
            }
            drow_dashboards()
        }

        const selectOneFilterItem = (e) => {
            e.currentTarget.parentNode.querySelectorAll('.item').forEach(el => el.classList.remove("active"))
            e.currentTarget.classList.add('active')
            global_filters[e.currentTarget.getAttribute('data-filter')] = [e.currentTarget.getAttribute('data-id')]
            drow_dashboards()
        }
        
        const drow_filter = (item, type) => {
            // console.log(item.title, type)
            let existing_list = document.getElementById("existing-"+ type +"-list")
            let item_cont = document.createElement('div')
            item_cont.className = "item active"
            item_cont.setAttribute("data-id", item.title)
            item_cont.setAttribute("data-filter", type)
            item.dom = item_cont
            existing_list.appendChild(item_cont)  
            if(type == 'channels'){
                item_cont.innerHTML +=  `<div class="item-logo"><img class="profile-picture" src="` + item.img + `" />
                <i class="fab fa-` + item.platform + `"></i></div>`
            }
            if(type == 'persons' || type == 'symbols' || type == 'platforms'){
                item_cont.innerHTML +=  `<div class="item-logo"><img class="profile-picture" src="` + item.img + `" /></div>`
            }
            item_cont.innerHTML += `<div class="item-name">` + item.title + ` </div><i class="fas fa-check"></i>`
            item_cont.onclick = toggleTheFilterItem
            item_cont.ondblclick = selectOneFilterItem  
        }
        
        //filter-dates
        let global_filters = {}

        global_filters.date = {
            from: new Date(2021, 1, 1),
            to: new Date()
        }
        // document.getElementById('filter-date-from').valueAsDate = global_filters.date.from;
        // document.getElementById('filter-date-to').valueAsDate = global_filters.date.to;
        // document.getElementById('filter-date-from').onchange = (e) => {
        //     global_filters.date.from = new Date(e.target.value)
        //     drow_dashboards()
        // }
        // document.getElementById('filter-date-to').onchange = (e) => {
        //     global_filters.date.to = new Date(e.target.value)
        //     drow_dashboards()
        // }
        //filter channels


        //get initial data
        let global_data = {}
        const fetch_initial_data = async () => {
            let topics = [{"terms":["\u10d4\u10d9\u10dd\u10dc\u10dd\u10db\u10d8\u10d9","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0"],"title":"Economics"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"LGBTQ"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"EU"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"COVID 19"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"Elections"}]

            let channels = [{"analized_from":"Fri, 01 Jan 2021 00:00:00 GMT","analized_to":"Thu, 29 Jul 2021 00:00:00 GMT","fetched":true,"id":122,"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.18169-1/p320x320/555064_10151842288732360_1999986922_n.png?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=gEAhYIIYcWAAX-YHlaS&_nc_ht=scontent.ftbs4-1.fna&oh=330f1b473ae0b3db1bb043fef427d3c2&oe=6127A73B","platform":"facebook","platform_id":"10151842288732360","title":"\u10e0\u10d0\u10d3\u10d8\u10dd \u10d7\u10d0\u10d5\u10d8\u10e1\u10e3\u10e4\u10da\u10d4\u10d1\u10d0 radio tavisufleba","url":"http://www.facebook.com/radiotavisufleba"},{"analized_from":"","analized_to":"","fetched":"","id":"129381729","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p200x200/187792897_2955412488071948_6187605992762447475_n.png?_nc_cat=106&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=nnXSKBpT25AAX-XfHnM&_nc_ht=scontent.ftbs6-1.fna&oh=a13322ac57c88fd106a0b52da1e1fc44&oe=611EDECE","platform":"facebook","platform_id":"","title":"Myth Detector","url":"http://www.facebook.com/radiotavisufleba"},{"analized_from":"","analized_to":"","fetched":"","id":"00293477","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/45886682_10157018470719752_2326261558616784896_n.png?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=dhW3E8bhuLIAX9_sCNu&_nc_ht=scontent.ftbs6-1.fna&oh=83e8d5817cc52fe62e2c5aa758f6e467&oe=612131D5","platform":"facebook","platform_id":"","title":"ambebi.ge","url":"http://www.facebook.com/radiotavisufleba"},{"analized_from":"","analized_to":"","fetched":"","id":"1292349","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/86261417_1077320529280102_1486244274247827456_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=3coijy2--SQAX9b5rYi&_nc_ht=scontent.ftbs6-1.fna&oh=a4c41fcafe318c40997be20a20427c60&oe=6121F5D5","platform":"facebook","platform_id":"","title":"POSTV","url":"http://www.facebook.com/radiotavisufleba"},{"analized_from":"","analized_to":"","fetched":"","id":"12923493","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.18169-9/cp0/c47.0.866.866a/s118x90/29541674_573019473063645_1634631189445452996_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=70495d&_nc_ohc=bZ7MpliL1aYAX8Ew7SL&_nc_ht=scontent.ftbs6-1.fna&oh=e0e0baa77c39db3873c3040627e5b9a5&oe=6121789A","platform":"facebook","platform_id":"","title":"Info 24","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"1292349","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p148x148/71718242_1161607410697190_2919291461524520960_n.png?_nc_cat=101&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=qGVMdY8mNoUAX-UYCxo&_nc_ht=scontent.ftbs6-1.fna&oh=b1dbed88d047c940b897b5a422b983ce&oe=6121B4A1","platform":"viber","platform_id":"","title":"Publica","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"1222349","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t31.18172-1/cp0/p74x74/15304254_1228304067261509_2241489461398828170_o.jpg?_nc_cat=1&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=mEW1QEGv6NMAX_CIlFC&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs6-1.fna&oh=0b64ee6074f9089a7e256c8bb0360217&oe=61211498","platform":"youtube","platform_id":"","title":"Imedi TV","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"1278349","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/cp0/p80x80/69473894_107069937329792_1262745274359480320_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=i7vbN2sbKZgAX8Ok3N0&_nc_ht=scontent.ftbs6-1.fna&oh=2ad79a7b9646131c6de87ef33e7c0b19&oe=6120DA2B","platform":"facebook","platform_id":"","title":"Mtavari","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/72546530_1383478278478142_5028876172075728896_n.png?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=TmC5M8mXx-4AX9PVl5j&_nc_ht=scontent.ftbs6-1.fna&oh=fcfcfed7cf93ccfb30e7bf96ae21384c&oe=612265F6","platform":"youtube","platform_id":"","title":"TV Pirveli","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"12322349","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/84358956_1257309294464568_2663158943638880256_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=RleYO-973_kAX_najfh&_nc_ht=scontent.ftbs6-1.fna&oh=719fa5f79dd40c85aba87a2cf9528e65&oe=61226F3F","platform":"viber","platform_id":"","title":"Pos TV","url":"https://fb.com"},{"analized_from":"","analized_to":"","fetched":"","id":"1292039","img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.18169-1/p100x100/1925279_1480214478865684_1317880383_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=gvFVgvoOHi4AX-I96fZ&_nc_ht=scontent.ftbs6-1.fna&oh=f790a58a858ccdee8aac1919a10cdf91&oe=61226BA0","platform":"facebook","platform_id":"","title":"Mtavari","url":"https://fb.com"}]

            let persons = [{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p320x320/145537338_246363983613696_6499760920351772995_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=c6021c&_nc_ohc=glbxOTgS0hIAX8AvdKx&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=193d8e9c5764629b2bdcbc15ac4e1f2c&oe=612E8681","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Giorgi Gakharia","topics":[""]},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p200x200/123105415_652704468750756_7871444256643009404_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=9DVIwaKbUAMAX80GI-E&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=5e3dc208c7b161ae9eb38502b92e17be&oe=612E41E6","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Tea Tsulikiani","topics":[""]},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p200x200/132041171_4256267534429612_1919071427480023829_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=gzt9Z0YLO8QAX-I5kZN&_nc_ht=scontent.ftbs4-1.fna&oh=e7cb01a5adc700fb7510c092ca93da21&oe=612DEF29","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Charles Michel","topics":[""]}]

            let symbols = [{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p320x320/145537338_246363983613696_6499760920351772995_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=c6021c&_nc_ohc=glbxOTgS0hIAX8AvdKx&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=193d8e9c5764629b2bdcbc15ac4e1f2c&oe=612E8681","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Giorgi Gakharia","topics":[""]},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p200x200/123105415_652704468750756_7871444256643009404_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=9DVIwaKbUAMAX80GI-E&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=5e3dc208c7b161ae9eb38502b92e17be&oe=612E41E6","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Tea Tsulikiani","topics":[""]},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p200x200/132041171_4256267534429612_1919071427480023829_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=gzt9Z0YLO8QAX-I5kZN&_nc_ht=scontent.ftbs4-1.fna&oh=e7cb01a5adc700fb7510c092ca93da21&oe=612DEF29","terms":["\u10e6\u10d0\u10e0\u10d8\u10d1\u10d0\u10e8\u10d5\u10d8\u10da\u10d8, ~\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10ee\u10da\u10d4\u10d8","\u10e2\u10e0\u10d8-\u10e2\u10e0\u10d8","\u10d0\u10dc\u10e2\u10dd\u10dc\u10d8"],"title":"Charles Michel","topics":[""]}]

            let locations = [{"country":"Georgia","lat":42.2133555,"long":42.95938934,"terms":[],"title":"Tbilisi"},{"country":"USA","lat":42.8133555,"long":43.45938934,"terms":[],"title":"New Your"},{"country":"Georgia","lat":42.4133555,"long":43.35938934,"terms":"","title":"Gori"},{"country":"Georgia","lat":42.2133555,"long":43.99938934,"terms":"","title":"Paris"}]

            let entities = [{"terms":["\u10d4\u10d9\u10dd\u10dc\u10dd\u10db\u10d8\u10d9","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0"],"title":"EU"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"NATO"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"Parlament of Georgia"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"Russian DUMA"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"Supreme Courte"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"CESKO"},{"terms":["\u10de\u10e0\u10d8\u10d3\u10d8","\u10d1\u10da\u10d0 \u10d1\u10da\u10d0 OR \u10d1\u10da\u10e3 \u10d1\u10da\u10e3 NOT \u10d1\u10da\u10d8 \u10d1\u10da\u10d8"],"title":"Ministry of Internal Affairs"}]

            let platforms = [{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-9/58978526_10158354585751729_7411073224387067904_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=VH9P8QeGSE0AX-rnjLJ&_nc_ht=scontent.ftbs4-1.fna&oh=4786076af74eba3d5e0d262860398c4e&oe=612D36D5","title":"facebook"},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-9/66293496_10158496818691754_3969510587162951680_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=H7QpGGTnk78AX-CxTMU&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=ecf376d795e3c81adca9461cec34c656&oe=612DE640","title":"youtube"},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-9/38200127_936914206478902_8945096849434345472_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=BCXLmCwFi-UAX9TxM2F&tn=rhVX4__77HOsdZUC&_nc_ht=scontent.ftbs4-1.fna&oh=b850d57c90235bc58f17177b92cc2c0d&oe=612E9403","title":"tiktok"},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-9/151779888_3850339665022826_3221997795278020924_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=wyRFvB_SvmsAX-JAaWP&_nc_ht=scontent.ftbs4-1.fna&oh=ef75f086cdecf04708b071320e05a375&oe=612D940B","title":"twitter"},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t39.30808-6/227400861_217347067062005_7783282287808445318_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=eYWfjZJoJywAX82rawk&_nc_ht=scontent.ftbs4-1.fna&oh=fc9cd87c6d0f3e39d441bdf7759e8ad1&oe=610E0024","title":"telegram"},{"img":"https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-9/51813460_2676456799061808_3614147784820654080_n.png?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ziPOZYeUG2AAX_nh7UV&_nc_ht=scontent.ftbs4-1.fna&oh=aeed59dc9a815b4c2c7e825334d09ada&oe=612D168D","title":"viber"},{"img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/72546530_1383478278478142_5028876172075728896_n.png?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=TmC5M8mXx-4AX9PVl5j&_nc_ht=scontent.ftbs6-1.fna&oh=fcfcfed7cf93ccfb30e7bf96ae21384c&oe=612265F6","title":"tv pirveli"},{"img":"https://static.myvideo.ge/media/cache/image/15403/0ad88260-d6a0-11e8-92cc-9f7ea6b37d3e_100x100.png","title":"rustavi2"},{"img":"https://static.myvideo.ge/media/cache/image/15681/22913180-d30e-11e9-b954-313437ef31a2_100x100.png","title":"mtavari"},{"img":"https://static.myvideo.ge/media/cache/image/15078/6db1a9e0-ae59-11e7-8bce-451e8c8199ef_100x100.png","title":"public bradcaster"},{"img":"https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-1/p100x100/84358956_1257309294464568_2663158943638880256_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=RleYO-973_kAX_najfh&_nc_ht=scontent.ftbs6-1.fna&oh=719fa5f79dd40c85aba87a2cf9528e65&oe=61226F3F","title":"post tv"},{"img":"https://static.myvideo.ge/media/cache/image/15738/d110ba00-06e3-11ea-9c12-17cd430ed5c3_100x100.png","title":"formula"}]

            let categories = [{"title":"Media News Company"},{"title":"News Site"},{"title":"Tv Channel"},{"title":"Government Organization"},{"title":"Activity General"},{"title":"Radio Station"},{"title":"Community"},{"title":"Broadcasting Media Production"},{"title":"Media"},{"title":"Politician"},{"title":"Local"},{"title":"Person"},{"title":"Ngo"},{"title":"Personal Blog"},{"title":"University"},{"title":"Learning"},{"title":"Parenting"},{"title":"Tv Network"},{"title":"Religious Organization"},{"title":"Travel Agency"},{"title":"Public Services Government"},{"title":"Political Organization"},{"title":"Work Team"},{"title":"Community Organization"},{"title":"Topic Newspaper"},{"title":"Tv Show"},{"title":"Political Party"},{"title":"Magazine"},{"title":"Music Production"},{"title":"Blogger"},{"title":"Education Company"},{"title":"Non Profit"},{"title":"Website"},{"title":"Author"},{"title":"Sports"},{"title":"Edu Site"},{"title":"Jobs"},{"title":"Sports Team"},{"title":"Consulate Embassy"},{"title":"Society Site"},{"title":"Topic Publisher"},{"title":"Artist"},{"title":"Media Agency"},{"title":"Activity Sport"},{"title":"Travel Company"},{"title":"Topic Arts Entertainment"},{"title":"Topic Just For Fun"},{"title":"Company"},{"title":"Community Services"},{"title":"Org General"},{"title":"Topic Library"},{"title":"Electronics Store"},{"title":"Government Official"},{"title":"Local Services"},{"title":"Armed Forces"},{"title":"Telecom"},{"title":"Tour Guide"},{"title":"Military Base"},{"title":"Album"},{"title":"Music Video"},{"title":"News Personality"},{"title":"Public Services"},{"title":"Topic Museum"},{"title":"Law Enforcement"},{"title":"Sports League"},{"title":"Comedian"},{"title":"Educational Research"},{"title":"Christian Church"},{"title":"Newsagent Newsstand"},{"title":"City Hall"},{"title":"Topic Landmark"},{"title":"Cause"},{"title":"Bands Musicians"},{"title":"Consulting Company"},{"title":"Travel Services"},{"title":"Topic Sports Recreation"},{"title":"Amateur Sports League"},{"title":"Topic Shopping Retail"},{"title":"Eastern Orthodox Church"},{"title":"Journalist"},{"title":"Clothing"},{"title":"Entertainment Site"},{"title":"Not A Biz"},{"title":"Topic Book Store"},{"title":"Movie Writer"},{"title":"Scientist"},{"title":"History Museum"},{"title":"Art"},{"title":"Political Candidate"},{"title":"Health Food Restaurant"},{"title":"Festival"},{"title":"Topic Real Estate"},{"title":"Building Material Store"},{"title":"Industrials Company"},{"title":"Religious Center"},{"title":"Rec Site"},{"title":"Independent Bookstore"},{"title":"Song"},{"title":"Movie"},{"title":"Book"},{"title":"Restaurant"},{"title":"Charity Organization"},{"title":"Law Firm"},{"title":"Biz Site"},{"title":"Topic Tours Sightseeing"},{"title":"Regional Site"},{"title":"Advertising Marketing"},{"title":"Musician"},{"title":"Real Estate Company"},{"title":"Podcast"},{"title":"Science Engineering"},{"title":"Agricultural Service"},{"title":"Community College"},{"title":"Athlete"},{"title":"Health Beauty"},{"title":"Georgian Restaurant"},{"title":"Topic Photographer"},{"title":"Retail Company"},{"title":"Construction Company"},{"title":"Church"},{"title":"Hospital"},{"title":"Beauty Salon"},{"title":"Movie Television Studio"},{"title":"Medical Equipment Supplier"},{"title":"Labor Union"},{"title":"Professional Sport Team"},{"title":"Real Estate Investment"},{"title":"Medical Center"},{"title":"School"},{"title":"Theatrical Productions"},{"title":"Game"},{"title":"Real Estate Agent"},{"title":"Gift Shop"},{"title":"Health Company"},{"title":"Automotive Manufacturing"},{"title":"Sculpture Garden"},{"title":"Medical Health"},{"title":"Rental Shop"},{"title":"Product Service"},{"title":"Youth Organization"},{"title":"Band"},{"title":"Performance Art"},{"title":"Real Estate Title Development"},{"title":"Topic Hotel"},{"title":"Private School"},{"title":"Pub"},{"title":"Literary Arts"},{"title":"Theatre"},{"title":"Camera Photo"},{"title":"Property Management"},{"title":"Government Building"},{"title":"Video Creator"},{"title":"Park"},{"title":"Social Services"},{"title":"Petroleum Services"},{"title":"Defense Company"},{"title":"Advertising Agency"},{"title":"Photographic Services Equipment"},{"title":"Community Center"},{"title":"Transportation Service"},{"title":"Cafe"},{"title":"Live Music Venue"},{"title":"Winery Vineyard"},{"title":"Design"},{"title":"Gym"},{"title":"Sports Club"},{"title":"Amateur Team"},{"title":"Pharmacy"},{"title":"Apostolic Church"},{"title":"Garden Center"},{"title":"Oncologist"},{"title":"Architectural Designer"},{"title":"Electronics"},{"title":"Business Consultant"},{"title":"Organic Grocery Store"},{"title":"Social Media Agency"},{"title":"Real Estate Developer"},{"title":"Health Food Store"},{"title":"Mobile Phone Shop"},{"title":"Food Beverage"},{"title":"Topic Bar"},{"title":"Arts Crafts Supply Store"},{"title":"School Team"},{"title":"Fast Food Restaurant"},{"title":"Dance School"},{"title":"Casino"},{"title":"Supermarket"},{"title":"Engineering Service"},{"title":"Yoga Pilates"},{"title":"Sports Venue Stadium"},{"title":"Cosmetics Beauty Supply"},{"title":"Information Technology Company"},{"title":"Gaming Video Creator"},{"title":"Fictional Character"},{"title":"Pet"},{"title":"Accessories Store"},{"title":"Agricultural Cooperatives"},{"title":"Food Company"},{"title":"Tutoring"},{"title":"Car"},{"title":"Spa Beauty Personal Care"},{"title":"Performing Arts"},{"title":"Railroad"}]


            global_data.topics = topics
            global_data.channels = channels
            global_data.persons = persons
            global_data.symbols = symbols
            global_data.locations = locations
            global_data.entities = entities
            global_data.platforms = platforms
            global_data.categories = categories
            
            
            global_filters.topics = topics.map(i => i.title)
            global_filters.channels = channels.map(i => i.title)
            global_filters.persons = persons.map(i => i.title)
            global_filters.symbols = symbols.map(i => i.title)
            global_filters.locations = locations.map(i => i.title)
            global_filters.entities = entities.map(i => i.title)
            global_filters.platforms = platforms.map(i => i.title)
            global_filters.categories = platforms.map(i => i.categories)
        }

        const fetch_post_details = async (post) => {
            return [{
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "ავღანეთის ქალაქ ასადაბადში გამართულ საპროტესტო აქციაზე „თალიბებმა“ მომიტინგეებს ცეცხლი გაუხსნეს, რის შედეგადაც რამდენიმე ადამიანი დაიღუპა",
                "from_": 10,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 1
            },{
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "სააგენტოს ცნობით, „თალიბმა“ მებრძოლებმა დამოუკიდებლობის აღსანიშნავად შეკრებილ მოქალაქეებს ესროლეს, რომლებიც ავღანეთის დროშებს აფრიალებდნენ და „თალიბების“ დროშებს ხევდნენ",
                "from_": 15,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 1
            },
            {
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "წერს, რომ ჯერჯერობით დაუდგენელია, დაღუპულები ცეცხლსასროლი იარაღიდან ნასროლ ტყვიას ემსხვერპლნენ, თუ სროლის შედეგად შექმნილ ჭყლეტას",
                "from_": 20,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 2
            },{
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "ავღანეთის ქალაქ ასადაბადში გამართულ საპროტესტო აქციაზე „თალიბებმა“ მომიტინგეებს ცეცხლი გაუხსნეს, რის შედეგადაც რამდენიმე ადამიანი დაიღუპა",
                "from_": 10,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 2
            },{
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "ავღანეთის ქალაქ ასადაბადში გამართულ საპროტესტო აქციაზე „თალიბებმა“ მომიტინგეებს ცეცხლი გაუხსნეს, რის შედეგადაც რამდენიმე ადამიანი დაიღუპა",
                "from_": 10,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 3
            },{
                "post_id": 11233,
                "where": "video",//title/post|link|description|link_title|link_descr|video-speech|video-text
                "topics": ["EU"],
                "sentence": "ავღანეთის ქალაქ ასადაბადში გამართულ საპროტესტო აქციაზე „თალიბებმა“ მომიტინგეებს ცეცხლი გაუხსნეს, რის შედეგადაც რამდენიმე ადამიანი დაიღუპა",
                "from_": 10,
                "to_": 25,
                "hate_speech": .6,
                "entities": [],
                "persons_mentioned": ["irakli_gharibashvili"],
                "persons_appeared": ["tom_jones"],
                "locations": ["tbilisi"],
                "symbols": ["geo_flag"],
                "speaker": 1
            }]
        }

        const drow_the_filters = () => {
            global_data.topics.forEach(item => drow_filter(item, "topics"))
            global_data.channels.forEach(item => drow_filter(item, "channels"))
            global_data.persons.forEach(item => drow_filter(item, "persons"))
            global_data.symbols.forEach(item => drow_filter(item, "symbols"))
            global_data.locations.forEach(item => drow_filter(item, "locations"))
            global_data.entities.forEach(item => drow_filter(item, "entities"))
            global_data.platforms.forEach(item => drow_filter(item, "platforms"))
            global_data.categories.forEach(item => drow_filter(item, "categories"))
            
        }

        //add channels popup
        const showSuggestions = suggestions => {
            let suggestionsCont = document.querySelector('#add-a-channel-pop .existing-itmes')
            suggestionsCont.innerHTML = ''
            suggestions.forEach(suggestion => {
                suggestionsCont.innerHTML += `<div class="item">
                        <div class="item-logo">
                            <img class="profile-picture"
                                src="`+ suggestion.img + `" />
                            <i class="fab fa-facebook"></i>
                        </div>
                        <div class="item-name">` + suggestion.title + `</div>
                        <i class="add-item">Select</i>
                    </div>`
            })
        }

        let chennel_search_platform = 'facebook'

        const set_chennel_search_platform = e => {
            // console.log(e.currentTarget)
            chennel_menu_items.forEach(el => el.classList.remove('active'))
            // debugger
            e.currentTarget.classList.add('active')
            chennel_search_platform = e.currentTarget.getAttribute('title')
        }

        chennel_menu_items = [...document.getElementsByClassName('chennel-menu-itme')]

        chennel_menu_items.forEach(el => el.onclick = set_chennel_search_platform)

        // document.getElementById('channel-search-input').onkeyup = debounce((ev) => {
        //     let postBody = new URLSearchParams();

        //     postBody.append('platform', chennel_search_platform);
        //     postBody.append('query', ev.target.value);

        //     fetch(url + '/search_channel', { method: 'post', body: postBody }).then(response => response.json())
        //         .then(showSuggestions);
        // }, 1000);

        //post popup

        const post_date_dom = document.getElementById("post-date")
        const post_video_dom = document.getElementById("post-video")
        const post_views_dom = document.getElementById("post-views")
        const post_shares_dom = document.getElementById("post-shares")
        const post_comments_dom = document.getElementById("post-comments")
        const post_likes_dom = document.getElementById("post-likes")
        const post_love_dom = document.getElementById("post-love")
        const post_wow_dom = document.getElementById("post-wow")
        const post_care_dom = document.getElementById("post-care")
        const post_haha_dom = document.getElementById("post-haha")
        const post_sad_dom = document.getElementById("post-sad")
        const post_angry_dom = document.getElementById("post-angry")
        const post_channel_dom = document.getElementById("post-channel")
        const post_title_dom = document.getElementById("post-title")
        const post_url_dom = document.getElementById("post-url")
        const post_descr_dom = document.getElementById("post-descr")
        const post_tags_dom = document.getElementById("post-tags")

        const show_post_pop = async () => {
            document.getElementById("post-details").style.display = "block"
            // console.log(popup_post)
            popup_post.video_url = "https://drive.google.com/uc?export=download&id=1VQzl05fN1V15FCCmp4kWH6tv_sh1wFnr"
            post_video_dom.setAttribute('src', (popup_post.video_url || ''))
            
            channel = global_data.channels.filter(channel => channel.title == popup_post.channel)[0]
            
            post_channel_dom.innerHTML =  `<div class="item-logo"><img class="profile-picture" src="` + channel.img + `" />
            <i class="fab fa-` + channel.platform + `"></i></div><div class="item-name">` + channel.title + ` </div>`
            

            post_url_dom.setAttribute('href', popup_post["URL"])
            post_descr_dom.innerHTML = popup_post["Description"] || ''

            let all_tags = popup_post["entities"].concat(popup_post["locations"]).concat(popup_post["persons_appeared"]).concat(popup_post["persons_mentioned"]).concat(popup_post["symbols"]).concat(popup_post["topics"])
            // console.log(all_tags)
            post_tags_dom.innerHTML = [...new Set(all_tags)].map(a => '<div>' + a + '</div>').join(' ')

            post_tags_dom.innerHTML += '<div ' + (popup_post["hate_speech"] > 80 ? 'class="hate-col"' : '') +'>Hate Speech: ' + popup_post["hate_speech"] + '</div>'
            post_date_dom.innerHTML = popup_post["Post Created Date"] || 0
            post_views_dom.innerHTML = popup_post["Total Views"] || 0
            post_shares_dom.innerHTML = popup_post["Shares"] || 0
            post_comments_dom.innerHTML = popup_post["Comments"] || 0
            post_likes_dom.innerHTML = popup_post["Likes"] || 0
            post_love_dom.innerHTML = popup_post["Love"] || 0
            post_wow_dom.innerHTML = popup_post["Wow"] || 0
            post_care_dom.innerHTML = popup_post["Care"] || 0
            post_haha_dom.innerHTML = popup_post["Haha"] || 0
            post_sad_dom.innerHTML = popup_post["Sad"] || 0
            post_angry_dom.innerHTML = popup_post["Angry"] || 0
            post_title_dom.innerHTML = popup_post["Message"] || popup_post["Link Text"] || ''
            
            post_details = await fetch_post_details(popup_post.id)
            drow_post_details(post_details) 
        }
        var ooo 
        const transcripts_cont = document.getElementById('transcripts-cont')
        const drow_post_details = (post_details) => {
            // console.log(post_details)
            // ooo = post_details
            transcripts_cont.innerHTML = ''
            post_details.forEach(transcript => {
                let post_detail_dom = document.createElement('div')
                post_detail_dom.setAttribute("data-time", transcript.from_)
                post_detail_dom.onclick = (e) => {
                    post_video_dom.currentTime = e.currentTarget.getAttribute('data-time')
                }

                transcripts_cont.appendChild(post_detail_dom)
                
                let all_tags = transcript["entities"].concat(transcript["locations"]).concat(transcript["persons_appeared"]).concat(transcript["persons_mentioned"]).concat(transcript["symbols"]).concat(transcript["topics"]).filter(a => a)
                let tags_dom = [...new Set(all_tags)].map(a => '<div>' + a + '</div>').join(' ') 
                
                tags_dom += transcript["hate_speech"] > 80 ? '<div class="hate-col">Hate Speech</div>' : ''
                
                post_detail_dom.innerHTML = `
                <div class="text-chunk sp-` + (transcript["speaker"] || 1) + `" >
                    <div class="item-logo"><img class="profile-picture" src="https://scontent.ftbs4-1.fna.fbcdn.net/v/t1.6435-1/p320x320/145537338_246363983613696_6499760920351772995_n.jpg?_nc_cat=1&amp;ccb=1-3&amp;_nc_sid=c6021c&amp;_nc_ohc=glbxOTgS0hIAX8AvdKx&amp;tn=rhVX4__77HOsdZUC&amp;_nc_ht=scontent.ftbs4-1.fna&amp;oh=193d8e9c5764629b2bdcbc15ac4e1f2c&amp;oe=612E8681"></div>
                    <div class="text-actual">
                        ` + transcript.sentence + `
                    </div>` + (tags_dom.trim() ?  '<div class="tags">`'+ tags_dom + '</div>' : '') +  `
                    
                </div>`
            })
        }
        //chart

        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        const colors = [
            "#e07b5f", 
	        '#16A085',	
            '#27AE60',	
            '#2C3E50',
            '#F39C12',	
            '#2980B9',	
            '#D35400',	
            '#8E44AD',	
            "#c0392b",
            '#C0392B',
            "#2c3e50"
        ]
        const filter_colors = {
            "topics": '#16A085', "channels": '#27AE60', "persons": '#2980B9', "symbols": '#8E44AD', "locations": '#C0392B', "entities": '#F39C12'
        }
        
        //drow_dashboards

        //sort 
        const sortTable = (table, col, reverse) => {
            var tb = table, // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
                tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
                i;
            reverse = -((+reverse) || -1);
            tr = tr.sort( (a, b) => { 
                if(!isNaN(parseFloat(a.cells[col].textContent)) && !isNaN(parseFloat(b.cells[col].textContent))){
                    return reverse * (Number(a.cells[col].textContent) - Number(b.cells[col].textContent))
                }
                 
                return reverse 
                    * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                        .localeCompare(b.cells[col].textContent.trim())
                    );
            });
            for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
        }

        document.querySelectorAll('.dashboard-block .dashboard-table-header span').forEach(span => {
            span.onclick = e => {
                var nodes = Array.prototype.slice.call( e.target.parentNode.children ),
                    liRef = document.getElementsByClassName('match')[0];
                
                e.target.classList.toggle('reverse')

                sortTable(e.target.parentNode.parentNode.querySelector('table'), nodes.indexOf( e.target ), e.target.classList.contains('reverse'))
            }
        })

        //channels
        const drow_chennels_list = () => {
            document.querySelector("#chennels-list-aggregated .pop-header span").innerHTML = filtered_data.channels.length + '/' + global_data.channels.length
            let dom = document.querySelector("#chennels-list-aggregated .existing-itmes")
            dom.innerHTML = ''
            filtered_data.channels.forEach(channel => {
                posts = filtered_data.posts.filter(post => post.channel == channel.title)
                let row = document.createElement('tr')
                row.className = 'item'
                dom.appendChild(row)
                row.innerHTML = `<td><div class="item-logo"><img class="profile-picture" src="` + channel.img + `" /><i class="fab fa-` + channel.platform + `"></i></div>
                    <div class="item-name">` + channel.title + `</div></td>
                    <td>` + posts.length + `</td>
                    <td>` + posts.filter(post => post["Total Views"] > 0).length + `</td>
                    <td class="tags">` + [...new Set(posts.reduce((a, b) => a.concat(b.topics), []))].map(a => '<div>' + a + '</div>').join(' ') + `</td>
                    <td class="tags">` + [...new Set(posts.reduce((a, b) => a.concat(b.persons_mentioned), []))].map(a => '<div>' + a + '</div>').join(' ') + `</td>
                    <td class="tags">` + [...new Set(posts.reduce((a, b) => a.concat(b.persons_appeared), []))].map(a => '<div>' + a + '</div>').join(' ') + `</td>
                    <td class="tags">` + (posts.reduce((a, b) =>  a + b.hate_speech , 0) / posts.length) + `</td>
                    <td class="tags">` + [...new Set(posts.reduce((a, b) => a.concat(b.symbols), []))].map(a => '<div>' + a + '</div>').join(' ') + `</td>`
            })
        }
        

       
        // interactions
        
        const drow_interactions_chart = () => {
            // let dom = document.querySelector("#interactions")
            
            if (charts.interactions) charts.interactions.destroy()
            let grouped_per_channel = groupBy(filtered_data.posts, document.getElementById("interactions-meter").value)
            let grouped_by_date = groupBy(filtered_data.posts, 'Post Created Date')
            let sorted_dates = Object.keys(grouped_by_date).sort((a, b) => new Date(a) - new Date(b))

            let start_date = new Date(sorted_dates[0])
            let datasets = []
            let labels = []
            Object.keys(grouped_per_channel).forEach((channel, channel_index) => {
                labels = []
                let grouped_by_date = groupBy(grouped_per_channel[channel], 'Post Created Date')

                let sorted_keys = Object.keys(grouped_by_date).sort((a, b) => new Date(a) - new Date(b))

                let cur_date = new Date(start_date.getTime());

                
                let values = []

                while(cur_date < new Date(sorted_keys[sorted_keys.length - 1])){
                    labels.push(cur_date.toLocaleDateString('en-CA'))
                    if(grouped_by_date[cur_date.toLocaleDateString('en-CA')]){
                        let arr = grouped_by_date[cur_date.toLocaleDateString('en-CA')]
                        let avg_val = arr.reduce((a, b) => a + b.Likes, 0) / arr.length
                        values.push(avg_val)
                    } else{
                        values.push(0)
                    }
                    cur_date.setDate(cur_date.getDate() + 1)
                }
                
                datasets.push({
                    label: channel,
                    backgroundColor: colors[channel_index],
                    borderColor: colors[channel_index],
                    data: values,
                })
            })

            let data = {
                labels: labels,
                datasets: datasets
            }
            let config = {
                type: 'line',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    responsive: true
                }
            };
            charts.interactions = new Chart(
                document.getElementById('interactions-chart'),
                config,
            );
        }
        // document.getElementById("interactions-meter").onchange = drow_interactions_chart 

        //hate speech
        let charts = {}
        const drow_hate_speech = () => {
            if (charts.hate_speech) charts.hate_speech.destroy()
            let grouped = groupBy(filtered_data.posts, 'Post Created Date')
            let values = Object.keys(grouped).map(date => grouped[date].reduce((a, b) => a + b.hate_speech, 0)/grouped[date].length)
            let data = {
                labels: Object.keys(grouped),
                datasets: [{
                    label: 'Hate speech activities over time',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: values,
                }]
            }
            let config = {
                type: 'line',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    responsive: true
                }
            };
            charts.hate_speech = new Chart(
                document.getElementById('myChart'),
                config,
            );
        }
        
        //init
        
        const init = async () => {
            await fetch_initial_data()
            
            // drow_the_filters()
            // await fetch(url + '/get_posts').then(response => response.json()).then(posts => global_data.posts = posts),
            global_data.posts = POSTS_
            global_data.posts.forEach(post => {
                post.channel = global_data.channels[Math.floor(Math.random() * global_data.channels.length)].title
                post.date = new Date(post['Post Created Date'])
                post.Likes = Math.floor(Math.random() * 2000)
            })
            drow_dashboards()
        }
        init()
