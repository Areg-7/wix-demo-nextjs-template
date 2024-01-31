import Link from "next/link";
import React from "react";
import { BLOGS_ROUTE } from "@/app/routes";
import Image from 'next/image';
import { getWixClient } from '@/app/hooks/useWixClientServer';
import { media } from '@wix/sdk'

async function Blogs() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items.queryDataItems({
    dataCollectionId: "FarmToTableRecipes"
  }).limit(3)
    .ascending("createdAt")
    .find();

  return (
    <div className="max-md:mb-8 grid md:gap-x-[64px] gap-y-8 md:p-[120px] p-[32px] lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mx-[auto]">
      <div className="flex flex-col gap-[64px] md:ms-[88px] py-[64px] md:order-2">
        <div className="flex flex-col gap-[24px]">
          <h3 className="font-libre font-bold text-[50px] leading-[62px] max-md:text-center">
            Blog
          </h3>
          <p className="font-roboto font-light md:text-sm text-lg  max-md:text-center">
            Looking for a winning recipe? You&apos;ve come to the right place.
            All the recipes you can think of, for a first course, main course,
            side dish or dessert. Elevate your skills with seasonal recipes.
          </p>
          <Link
            href={BLOGS_ROUTE}
            className="md:w-[185px] mt-[24px] btn-main capitalize font-roboto text-center font-[400] text-xl justify-items-start max-md:justify-items-center"
          >
            Read More
          </Link>
        </div>
      </div>

      {items!.map((post: any, index: any) => (
        <BlogCard key={post.id} blog={post} index={index} />
      ))}
    </div>
  );
}

const BlogCard: React.FC<{ blog: any; index?: number }> = ({
                                                                  blog,
                                                                  index = -1,
                                                                }) => {
  return (
    <Link
      href={`${BLOGS_ROUTE}/${blog.data!.slug}`}
      className="flex flex-col gap-[24px] border-0 max-md:border-b border-[#E0E0E0] max-md:pb-[42px]"
    >
      <div className="h-[430px] w-auto">
        <Image
          alt="placeholder"
          src={media.getScaledToFillImageUrl(blog.data!.ingredients, 340, 430, {})}
          objectFit="cover"
          width={340}
          height={430}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index != -1 && index < 3}
        />
      </div>
      <h1 className="font-serif font-bold md:text-[24px] max-md:text-[18px] max-md:text-center leading-[27.27px]">
        {blog.data!.dishName}
      </h1>
    </Link>
  );
};

export const BlogSection = () => {
  return <Blogs />;
};
