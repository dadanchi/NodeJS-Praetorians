const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.topics.getAllTopics()
                .then((topics) => {
                    return res.render('topics/all', {
                        context: topics,
                    });
                });
        },
        // getPages(req, res) {
        //     const removedString = ':page';
        //     const page = req.params.page.substring(removedString.length);
        //     const nPerPage = 10;
        //     // const pagesTotal = data.topics.getAllPages();
        //     return data.topics.getPages(nPerPage, page)
        //         .then((result) => {
        //             const conteiner = [];
        //             // console.log(topics);
        //             // console.log(topics);
        //             result.forEach((element, index) => {
        //                 const obj = {};
        //                 //  console.log(element.title);
        //                 //  console.log(element.author);
        //                 obj.topic = element;
        //                 // console.log(obj.title);
        //                 //  console.log(obj.author);
        //                 obj.page = page;
        //                 // console.log(obj.page );
        //                 conteiner.push(obj);
        //             });
        //             console.log(conteiner);
        //             res.render(`topics/pagination`, {
        //                 context: conteiner,
        //             });
        //         });
        // },
    };

    return controller;
};


module.exports = { init };
