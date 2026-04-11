"use client";

import {
  Faders,
  DotsThree,
  Lightning,
  GridFour,
  Users,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TabNavigation, TabItem } from "@/components/TabNavigation";
import { CreateCategoryDialog } from "@/components/finances/CreateCategoryDialog";
import { CreateSubcategoryDialog } from "@/components/finances/CreateSubcategoryDialog";
import { CreatePayeeDialog } from "@/components/finances/CreatePayeeDialog";
import { CategoriesTab } from "@/components/financial-settings/CategoriesTab";
import { PayeesTab } from "@/components/financial-settings/PayeesTab";

// Types
type Subcategory = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  subcategories: Subcategory[];
};

// Mock data for categories
const initialCategories: Category[] = [
  {
    id: 1,
    name: "Clergy Wages",
    subcategories: [],
  },
  {
    id: 2,
    name: "General Expenses",
    subcategories: [],
  },
  {
    id: 3,
    name: "General Offerings",
    subcategories: [],
  },
  {
    id: 4,
    name: "Miscellaneous Taxes",
    subcategories: [],
  },
];

export default function FinancialSettingsPage() {
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState(initialCategories);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createSubcategoryOpen, setCreateSubcategoryOpen] = useState(false);
  const [createPayeeOpen, setCreatePayeeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [payees, setPayees] = useState<
    Array<{
      id: number;
      name: string;
      type: string;
      email?: string;
      phone?: string;
    }>
  >([]);

  const handleCreateCategory = (data: { name: string }) => {
    const newCategory = {
      id: categories.length + 1,
      name: data.name,
      subcategories: [],
    };
    setCategories([...categories, newCategory]);
  };

  const handleCreateSubcategory = (data: {
    name: string;
    categoryId: number;
  }) => {
    setCategories(
      categories.map((cat) =>
        cat.id === data.categoryId
          ? {
              ...cat,
              subcategories: [
                ...cat.subcategories,
                { id: cat.subcategories.length + 1, name: data.name },
              ],
            }
          : cat
      )
    );
  };

  const handleAddSubcategory = (categoryId: number, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setCreateSubcategoryOpen(true);
  };

  const handleCreatePayee = (data: {
    name: string;
    type: string;
    email?: string;
    phone?: string;
  }) => {
    const newPayee = {
      id: payees.length + 1,
      ...data,
    };
    setPayees([...payees, newPayee]);
  };

  const tabs: TabItem[] = [
    {
      value: "categories",
      label: "Categories",
      icon: <GridFour className="w-4 h-4" />,
      content: (
        <CategoriesTab
          categories={categories}
          onCreateCategory={() => setCreateCategoryOpen(true)}
          onAddSubcategory={handleAddSubcategory}
        />
      ),
    },
    {
      value: "payees",
      label: "Payees and Vendors",
      icon: <Users className="w-4 h-4" />,
      content: (
        <PayeesTab
          payees={payees}
          onCreatePayee={() => setCreatePayeeOpen(true)}
        />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Faders className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Financial Settings</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Lightning className="w-4 h-4 text-primary" />
            Activate online giving
          </Button>
          <Button variant="ghost" size="icon">
            <DotsThree className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Dialogs */}
      <CreateCategoryDialog
        open={createCategoryOpen}
        onOpenChange={setCreateCategoryOpen}
        onSubmit={handleCreateCategory}
      />
      {selectedCategory && (
        <CreateSubcategoryDialog
          open={createSubcategoryOpen}
          onOpenChange={setCreateSubcategoryOpen}
          onSubmit={handleCreateSubcategory}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
        />
      )}
      <CreatePayeeDialog
        open={createPayeeOpen}
        onOpenChange={setCreatePayeeOpen}
        onSubmit={handleCreatePayee}
      />
    </div>
  );
}
