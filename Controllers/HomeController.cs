﻿using System.Web.Mvc;
using FlickrTest.Repository;
using System;

namespace FlickrTest.Controllers
{
    /// <summary>
    /// The home controller
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// GET: /Home/
        /// </summary>
        /// <returns>Returns an action result containing the view</returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Gets images from repository
        /// </summary>
        /// <param name="tags">Tags that should be searched for in the repository</param>
        /// <returns>A Json object containing the images from the repository</returns>
        /// 
        [HttpPost]
        public ActionResult GetImages(string tags, String usecache)
        {
            Boolean useCache = Boolean.Parse(usecache);
            if (!useCache)
            {
                var flickrRepository = new FlickrRepository();
                return Json(flickrRepository.GetImagesByTags(tags), JsonRequestBehavior.AllowGet);
            }
            else
            {
                var flickrRepository = new FlickrCacheableRepository();
                return Json(flickrRepository.GetImagesByTags(tags), JsonRequestBehavior.AllowGet);
            }
        }
    }
}
 

