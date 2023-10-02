import Button from "@/components/_shared/form/Button"

export const DashboardEditorKeyWords = () => {
  return (
    <div className="dashboard-editor-keywords">
      <div className="dashboard-editor-keywords__head flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center">
        <h2 className="dashboard-title">VISIBILITÉ PAR MOTS-CLÉ</h2>
        <Button
          variant='primary'
          text="Catalogue"
          className="w-max"
          />
      </div>
      <div className="db-editor__tags flex flex-wrap w-full gap-3 mt-12">
        <div className="tag">
          Tag 1
        </div>
        <div className="tag">
          Tag 2
        </div>
        <div className="tag">
          Tag 3
        </div>
      </div>
    </div>
  )
}