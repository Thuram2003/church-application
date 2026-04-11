"use client";

import { useState, Suspense } from "react";
import { FormBuilderTopBar } from "../../../components/forms/form-builder-top-bar";
import { FormHeader } from "../../../components/forms/form-header";
import { FieldList } from "../../../components/forms/field-list";
import { FieldSidebar } from "../../../components/forms/field-sidebar";
import { FieldPreview } from "../../../components/forms/field-preview";
import { useFormBuilder } from "../../../hooks/use-form-builder";

function FormBuilderContent() {
  const {
    formName,
    setFormName,
    header,
    setHeader,
    elements,
    selectedElementId,
    setSelectedElementId,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    moveElement,
    addOption,
    updateOption,
    deleteOption,
  } = useFormBuilder();

  const [showPreview, setShowPreview] = useState(false);

  const handlePublish = () => {
    console.log("Publishing form:", { formName, header, elements });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormBuilderTopBar
        formName={formName}
        onNameChange={setFormName}
        onPreview={() => setShowPreview(true)}
        onPublish={handlePublish}
      />

      <div className="flex h-[calc(100vh-60px)]">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-0">
            <FormHeader
              mode={header.mode}
              title={header.title}
              description={header.description}
              onChange={setHeader}
              isSelected={selectedElementId === null}
              onSelect={() => setSelectedElementId(null)}
            />

            <FieldList
              elements={elements}
              selectedId={selectedElementId}
              onSelect={setSelectedElementId}
              onAdd={addElement}
              onUpdate={updateElement}
              onDelete={deleteElement}
              onDuplicate={duplicateElement}
              onMove={moveElement}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onDeleteOption={deleteOption}
            />
          </div>
        </div>

        <FieldSidebar />
      </div>

      <FieldPreview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        formName={formName}
        header={header}
        elements={elements}
      />
    </div>
  );
}

export default function FormBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <FormBuilderContent />
    </Suspense>
  );
}
