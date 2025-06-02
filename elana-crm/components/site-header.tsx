import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function SiteHeader({
  breadcrumbItems,
  children,
}: {
  breadcrumbItems: {
    label: string;
    href?: string;
    description?: string;
  }[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <header className="flex min-h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}

                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        <p className="font-bold">{item.label}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6 px-4">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
